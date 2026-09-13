import { EntityComponentTypes, Container, ItemStack, Player, system, world } from "@minecraft/server"
import { holdMomeryFragment } from "./memoryFragment"
import { HoldItemTypes } from "../../lib/variables"

const cachePlayerHoldingItem: { [key: string]: IPlayerHoldItemInfo } = {} // Player Id > Hold Info
let amountOfListeners = 0
let invalidPlayers = 0
const maxTick = 4 // É o 5° Tick

function startInverval(executeTime = 0): void {
  const players = Object.entries(cachePlayerHoldingItem)
  const length = players.length
  amountOfListeners = length
  invalidPlayers = 0

  for(let i = 0; i < length; i++){
    const [ key, info ] = players[i] ?? []
    if(key == undefined || info == undefined) continue
    const { player, playerInv, item, lastSlot, type, typeFunc } = info

    // Remove o player da lista se ficar ínvalido, ocorre quando o player sai do mundo
    if(!player.isValid){
      removePlayerHoldListen(player.id, type)
      continue
    }

    // Se o player trocar se slot, remove o player do loop
    if(lastSlot != player.selectedSlotIndex){
      removePlayerHoldListen(player.id, type)
      continue
    }

    // Se o item atual da mão for diferente do item salvo, remove o player do loop
    const hand = playerInv.getItem(player.selectedSlotIndex)
    if(!hand || hand.typeId != item.typeId){
      removePlayerHoldListen(player.id, type)
      continue
    }

    if(executeTime == maxTick){ // 5° tick
      typeFunc(info)
    }
  }

  // Cancela o loop se não tiver mais jogadores
  if(length == invalidPlayers){
    amountOfListeners = 0
    return
  }

  // Reinicia o loop depois de 1 tick
  system.run(() => startInverval(executeTime >= maxTick ? 0 : executeTime +1))
}

export function addPlayerHoldListen(player: Player, item: ItemStack, slot: number): void {
  const playerInv = player.getComponent(EntityComponentTypes.Inventory)?.container
  if(!playerInv) return

  const type = HoldItemTypes[item.typeId]
  if(type == undefined) return

  const typeFunc = holdFunctions[type]

  cachePlayerHoldingItem[player.id] = { type, typeFunc, player, playerInv, item, lastSlot: slot }
  amountOfListeners == 0 && startInverval()
}

export function removePlayerHoldListen(playerId: string, type?: THoldTypes): void {
  invalidPlayers++
  delete cachePlayerHoldingItem[playerId]

  if(type){
    const player = world.getEntity(playerId)
    if(!player || !(player instanceof Player)) return

    const exe = removePlayerFunc[type]
    exe && exe(player)
  }
}

const holdFunctions: Record<THoldTypes, TTypeFunction> = {
  "memory_frag": (info) => { holdMomeryFragment(info) }
}

const removePlayerFunc: { [key: string]: (player: Player) => void } = {
  "memory_frag": (player) => {
    player.removeTag("echo_rift:can_open_rift")
    player.removeTag("echo_rift:try_open_rift")
  }
}



export interface IPlayerHoldItemInfo {
  type: THoldTypes
  typeFunc: TTypeFunction
  player: Player
  playerInv: Container
  item: ItemStack
  lastSlot: number
}

export type THoldTypes = "memory_frag"
type TTypeFunction = (info: IPlayerHoldItemInfo) => void