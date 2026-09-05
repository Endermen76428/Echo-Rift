import { world } from "@minecraft/server"
import { startUpDimension } from "./functions/memory/startUp"
import { apiScoreboard } from "./lib/math/scoreboard"
import { roomsCache } from "./functions/memory/roomCache"
import { clearTimerInterval } from "./functions/memory/timer/interval"
import { apiWarn } from "./lib/player/warn"

const center = {x: 18.5, y: 0, z: 0.5}

world.afterEvents.itemUse.subscribe(({itemStack, source: player}) => {
  console.warn(itemStack.getTags())
  if(player.hasTag("dev")){
    if(itemStack.typeId == "minecraft:stick"){
      // apiWarn.notify(player, "errb:", {type: "title"})
      apiScoreboard.removeObj(player.dimension.id)
      const score = apiScoreboard.addObj(player.dimension.id)
      player.runCommand("/scoreboard objectives setdisplay sidebar echo_rift:forgotten_kingdom")

      apiScoreboard.setScore(player.dimension.id, "room", 0)
      apiScoreboard.setScore(player.dimension.id, "rp", 0)
      apiScoreboard.setScore(player.dimension.id, "rg", 1)
      const participants = score.getParticipants()
      for(let i = 0, len = participants.length; i < len; i++){
        const participant = participants[i]
        if(participant == undefined) continue

        (participant.displayName.startsWith("r-") || participant.displayName.startsWith("e-")) && score.removeParticipant(participant)
      }

      roomsCache.clear(player.dimension)
      startUpDimension(player.dimension, true)
      clearTimerInterval(player.dimension)
      player.dimension.getPlayers().forEach(p => { p.teleport(center) })
    }

    if(itemStack.typeId == "minecraft:wooden_sword"){
      if(player.isSneaking){
        apiScoreboard.addScore(player.dimension.id, "room", -1)
      } else {
        apiScoreboard.addScore(player.dimension.id, "room", 1)
      }
    }

    if(itemStack.typeId == "minecraft:netherite_sword"){
      player.dimension.getEntities({tags: ["echo_rift:need_kill"]}).forEach(entity => {
        entity.kill()
      })
    }
  }
})

let timer = 0
world.afterEvents.entityHitBlock.subscribe(({hitBlock}) => {
  timer = Date.now()
})

world.afterEvents.playerBreakBlock.subscribe((ev) => {
  console.warn(Date.now() - timer)
})