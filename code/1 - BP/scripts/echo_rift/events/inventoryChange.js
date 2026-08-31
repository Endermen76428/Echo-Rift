import { addPlayerHoldListen } from "../functions/holdItem/holdController";
import { world } from "@minecraft/server";
world.afterEvents.playerInventoryItemChange.subscribe(({ player, slot, itemStack, beforeItemStack }) => {
    if (slot == player.selectedSlotIndex) {
        if (beforeItemStack?.typeId != itemStack?.typeId && itemStack?.hasTag("echo_rift:hold_item")) {
            addPlayerHoldListen(player, itemStack, slot);
            return;
        }
    }
});
