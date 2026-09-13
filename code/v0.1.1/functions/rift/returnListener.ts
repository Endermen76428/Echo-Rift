import { getPlayerSpawnLocation } from "../../lib/player/spawn"
import { apiScoreboard } from "../../lib/math/scoreboard"
import { Entity, system } from "@minecraft/server"
import { roomsCache } from "../memory/roomCache"

const cacheRifts: { [key: string]: Entity } = {} // Dimension Id > Entity
let amountOfListeners = 0
let invalidRifts = 0
const maxTick = 4 // É o 10° Tick
const centerLocation = {x: 0, y: 0, z: 0}

function startInverval(executeTime = 0): void {
  const rifts = Object.entries(cacheRifts)
  const length = rifts.length
  amountOfListeners = length
  invalidRifts = 0

  if(executeTime == 4) for(let i = 0; i < length; i++){
    const [ key, entity ] = rifts[i] ?? []
    if(key == undefined || entity == undefined) continue

    if(!entity.isValid){
      removeReturnRiftListener(key)
      continue
    }

    const players = entity.dimension.getPlayers({location: centerLocation, maxDistance: 6})
    for(let playerI = 0, playerLen = players.length; playerI < playerLen; playerI++){
      const player = players[playerI]
      if(!player || !player.isValid) continue

      if(player.location.x < 0){
        if(players.length <= 1){
          apiScoreboard.removeObj(player.dimension.id, true)
          roomsCache.clear(player.dimension)
          entity.remove()
        }
        const spawnLoc = getPlayerSpawnLocation(player)
        player.teleport(spawnLoc, {dimension: spawnLoc.dimension})
      }
    }
  }

  // Cancela o loop se não tiver mais jogadores
  if(length == invalidRifts){
    amountOfListeners = 0
    return
  }

  // Reinicia o loop depois de 1 tick
  system.run(() => startInverval(executeTime >= maxTick ? 0 : executeTime +1))
}

export function addReturnRiftListener(entity: Entity): void {
  cacheRifts[entity.dimension.id] = entity
  amountOfListeners == 0 && startInverval()
}

export function removeReturnRiftListener(id: string): void {
  delete cacheRifts[id]
  invalidRifts++
}



type TItemRequest = { item: string, amount: number }
interface IRiftInfo {
  type: number // Memory Type Index
  rift: Entity
  total: number
  current: number
  slot0: TItemRequest
  slot1: TItemRequest
  slot2: TItemRequest
  slot3: TItemRequest
  deny: Set<string> // Item Id
  displacement: "x" | "z"
}