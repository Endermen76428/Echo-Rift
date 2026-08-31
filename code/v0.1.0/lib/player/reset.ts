import { Player } from "@minecraft/server"

export function resetPlayerTags(player: Player): void {
  const tags = player.getTags()
  for(let i = 0, len = tags.length; i < len; i++){
    const tag = tags[i]
    if(tag == undefined) continue

    if(!tag.startsWith("join", 10) && !tag.startsWith("rift", 10)) continue

    player.removeTag(tag)
  }
}