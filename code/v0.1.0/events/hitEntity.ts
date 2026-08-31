import { riftCloseFunc } from "../functions/rift/remove"
import { Player, world } from "@minecraft/server"

world.afterEvents.entityHitEntity.subscribe(({damagingEntity: player, hitEntity: entity}) => {
  if(!(player instanceof Player)) return

  if(entity.typeId == "echo_rift:spacetime_rift"){
    (entity.getProperty("echo_rift:complete") != 100 || player.hasTag("dev")) && riftCloseFunc(player, entity)
  }
})