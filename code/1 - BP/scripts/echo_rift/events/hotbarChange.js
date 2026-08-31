import { addPlayerHoldListen } from "../functions/holdItem/holdController";
import { world } from "@minecraft/server";
world.afterEvents.playerHotbarSelectedSlotChange.subscribe(({ player, itemStack, newSlotSelected }) => {
    if (itemStack) {
        if (itemStack.hasTag("echo_rift:hold_item")) {
            addPlayerHoldListen(player, itemStack, newSlotSelected);
            return;
        }
    }
});
