import { EntityComponentTypes, EquipmentSlot, world } from "@minecraft/server"
import { addPlayerHoldListen } from "../functions/holdItem/holdController"
import { memoryRaidFailed } from "../functions/memory/fail"
import { resetPlayerTags } from "../lib/player/reset"

world.afterEvents.playerSpawn.subscribe(({player, initialSpawn}) => {
  if(initialSpawn){
    resetPlayerTags(player)

    if(!player.hasTag("dev"))

    if(player.dimension.id.startsWith("echo_rift:")){
      const healthComp = player.getComponent(EntityComponentTypes.Health)
      const hungerComp = player.getComponent(EntityComponentTypes.Hunger)
      if(healthComp == undefined || hungerComp == undefined) return

      return memoryRaidFailed(player, healthComp, hungerComp)
    }

    const item = player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)
    if(item?.hasTag("echo_rift:hold_item")){
      addPlayerHoldListen(player, item, player.selectedSlotIndex)
    }
  }
})