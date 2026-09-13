import { Dimension, EntityComponentTypes, EntityHealthComponent, EntityHungerComponent, EquipmentSlot, Player, system } from "@minecraft/server"
import { getPlayerSpawnLocation } from "../../lib/player/spawn"
import { equippablesVariables } from "../../lib/variables"
import { apiScoreboard } from "../../lib/math/scoreboard"
import { apiWarn } from "../../lib/player/warn"
import { roomsCache } from "./roomCache"

const FailScreenLocation = {x: 0.5, y: 4095, z: 0.5}

export function memoryRaidFailed(player: Player, healthComp: EntityHealthComponent, hungerComp: EntityHungerComponent): void {
  const alivePlayers = player.dimension.getPlayers().length -1

  if(alivePlayers <= 0){
    apiScoreboard.removeObj(player.dimension.id, true)
    roomsCache.clear(player.dimension)
  }

  const spawnLoc = getPlayerSpawnLocation(player)
  player.teleport(FailScreenLocation)
  apiWarn.notify(player, "errb:", {type: "title"})
  apiWarn.notify(player, {translate: "dimension.warn.echo_rift:general.fail"}, {type: "title", sound: "dimension.echo_rift:raid.fail", delaySound: 1, subtitle: {fadeInDuration: 10, stayDuration: 40, fadeOutDuration: 5, subtitle: {translate: "dimension.warn.echo_rift:general.fail.subtitle"}}})

  system.runTimeout(() => {
    const backup = player.dimension.getEntities({tags: [`echo_rift:${player.id}`]})[0]
    if(backup != undefined){
      const playerInv = player.getComponent(EntityComponentTypes.Inventory)?.container
      const playerEquip = player.getComponent(EntityComponentTypes.Equippable)
      const entityInv = backup.getComponent(EntityComponentTypes.Inventory)?.container

      if(playerInv && playerEquip && entityInv){
        const invSize = entityInv.size
        for(let i = 0, len = playerInv.size; i < len; i++){
          playerInv.setItem(i, entityInv.getItem(i))
        }

        for(let i = 0; i < 5; i++){
          const equip = equippablesVariables[i]
          if(equip == undefined) continue

          playerEquip.setEquipment(equip as EquipmentSlot, entityInv.getItem(invSize -i -1))
        }
      }
    } else { console.error("§cPlayer Inventory Backup Invalid!") }
  }, 5)

  system.runTimeout(() => {
    player.teleport(spawnLoc, {dimension: spawnLoc.dimension})
    healthComp.resetToDefaultValue()
    hungerComp.resetToDefaultValue()
  }, 55)
}