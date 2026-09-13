import { RiftRequestItemsTranslate } from "../../lib/variables"
import { apiWarn } from "../../lib/player/warn"
import { Player } from "@minecraft/server"

const completeTranslate = "entity.warn.echo_rift:spacetime_rift.unstable.item_complete"

export function sendSacrificeMessage(player: Player, type: "new" | number, items: [string, number][], sound = false): void {
  player.isValid && apiWarn.notify(player, {
    "rawtext": [
      {"translate": "entity.warn.echo_rift:spacetime_rift.unstable." + (type == "new" ? type : "missing"), "with": [type.toString()]},
      {"translate": (r => r == 0 ? completeTranslate : `> ${r} `)(items[0]?.[1])}, {"translate": RiftRequestItemsTranslate[items[0]?.[0] ?? ""]}, {"text": "§r\n"},
      {"translate": (r => r == 0 ? completeTranslate : `> ${r} `)(items[1]?.[1])}, {"translate": RiftRequestItemsTranslate[items[1]?.[0] ?? ""]}, {"text": "§r\n"},
      {"translate": (r => r == 0 ? completeTranslate : `> ${r} `)(items[2]?.[1])}, {"translate": RiftRequestItemsTranslate[items[2]?.[0] ?? ""]}, {"text": "§r\n"},
      {"translate": (r => r == 0 ? completeTranslate : `> ${r} `)(items[3]?.[1])}, {"translate": RiftRequestItemsTranslate[items[3]?.[0] ?? ""]}, {"text": "§r\n"}
    ]
  }, sound ? {sound: "warn.ender_addon_pack:deactive", volume: 7} : undefined)
}