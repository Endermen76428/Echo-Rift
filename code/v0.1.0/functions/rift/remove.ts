import { Entity, ItemStack, Player, world } from "@minecraft/server"
import { removeRiftListener } from "./spaceTimeListener"
import { memoryFragmentIds } from "../../lib/variables"
import { MessageFormData } from "@minecraft/server-ui"

export function riftCloseFunc(player: Player, entity: Entity): void {
  new MessageFormData()
  .title("ui.echo_rift:rift.remove.title")
  .body("ui.echo_rift:rift.remove.body")
  .button1("ui.echo_rift:rift.remove.title")
  .button2("ui.echo_rift:rift.remove.keep")
  .show(player).then(({canceled, selection}) => {
    if(canceled || selection == undefined || selection == 1) return

    if(!entity.isValid) return

    const typeIndex = entity.getProperty("echo_rift:type")
    if(typeof typeIndex != "number") return

    const itemId = memoryFragmentIds[typeIndex]
    if(!itemId) return

    const height = (r => typeof r == "number" ? r : 3)(entity.getProperty("echo_rift:height"))

    entity.playAnimation("animation.echo_rift.nothing", {stopExpression: "v.removing = true;"})
    const item = player.dimension.spawnItem(new ItemStack(itemId), {x: entity.location.x, y: entity.location.y + height * 0.5, z: entity.location.z})

    item.clearVelocity()
    const disX = player.location.x - item.location.x
    const disZ = player.location.z - item.location.z
    const dir = disX * disX > disZ * disZ ? "x" : "z"
    item.applyImpulse({x: (dir == "x" ? 0.25 : 0) * Math.sign(disX), y: 0.25, z: (dir == "z" ? 0.25 : 0) * Math.sign(disZ)})

    removeRiftListener(entity.id)

    const riftTag = `echo_rift:rift${entity.id}`
    const joinTag = `echo_rift:join${entity.id}`
    const players = world.getPlayers({tags: [riftTag]})
    for(let i = 0, len = players.length; i < len; i++){
      const player = players[i]
      if(!player || !player.isValid) continue
      player.removeTag(riftTag)
      player.removeTag(joinTag)
    }

    entity.triggerEvent("echo_rift:start_removing")
  })
}