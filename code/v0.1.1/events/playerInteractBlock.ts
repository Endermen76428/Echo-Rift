import { placeSlabVertical } from "../functions/build/slabsVertical"
import { placeSlab } from "../functions/build/slabs"
import { world } from "@minecraft/server"

world.beforeEvents.playerInteractWithBlock.subscribe((ev) => {
  if(ev.isFirstEvent == false) return
  if(ev.itemStack == undefined) return
  const item = ev.itemStack

  if(item.hasTag("bedrock_awakening:slab")) return placeSlab(ev)
  if(item.hasTag("bedrock_awakening:slab_vertical")) return placeSlabVertical(ev)
})