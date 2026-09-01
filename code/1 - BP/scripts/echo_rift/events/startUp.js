import { holdMomeryFragment } from "../functions/holdItem/memoryFragment";
import { EntityComponentTypes, system } from "@minecraft/server";
import { openDoor } from "../functions/memory/open_door";
import { guidebook } from "../functions/guidebook/guidebook";
system.beforeEvents.startup.subscribe(({ blockComponentRegistry: customB, itemComponentRegistry: customI, dimensionRegistry: customD }) => {
    customD.registerCustomDimension("echo_rift:forgotten_kingdom");
    customB.registerCustomComponent("echo_rift:portal_corner", {
        onBreak: ({ block }) => { }
    });
    customB.registerCustomComponent("echo_rift:door", {
        onPlayerInteract: ({ block }) => {
            openDoor(block);
        }
    });
    customI.registerCustomComponent("echo_rift:guidebook", {
        onUse: ({ source }) => {
            guidebook.open(source, []);
        }
    });
    customI.registerCustomComponent("echo_rift:memory_fragment", {
        onUse: ({ source: player, itemStack: item }) => {
            if (item && player.hasTag("echo_rift:can_open_rift")) {
                player.addTag("echo_rift:try_open_rift");
                player.removeTag("echo_rift:can_open_rift");
                const playerInv = player.getComponent(EntityComponentTypes.Inventory)?.container;
                if (playerInv == undefined)
                    return;
                holdMomeryFragment({ type: "memory_frag", typeFunc: () => { }, player, playerInv, item, lastSlot: player.selectedSlotIndex });
            }
        }
    });
});
