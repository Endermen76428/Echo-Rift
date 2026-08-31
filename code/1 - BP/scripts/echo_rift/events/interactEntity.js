import { addRiftListener } from "../functions/rift/spaceTimeListener";
import { world } from "@minecraft/server";
world.afterEvents.playerInteractWithEntity.subscribe(ev => {
    const { player, target } = ev;
    if (target.typeId == "echo_rift:spacetime_rift") {
        if (player.hasTag("dev")) {
            target.setDynamicProperties({ "cur0": 0, "cur1": 0, "cur2": 0, "cur3": 0 });
            target.setProperty("echo_rift:complete", 100);
            addRiftListener(target);
        }
    }
});
