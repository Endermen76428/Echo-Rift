import { EntityComponentTypes, Player, system, world } from "@minecraft/server";
import { holdMomeryFragment } from "./memoryFragment";
import { HoldItemTypes } from "../../lib/variables";
const cachePlayerHoldingItem = {};
let amountOfListeners = 0;
let invalidPlayers = 0;
const maxTick = 4;
function startInverval(executeTime = 0) {
    const players = Object.entries(cachePlayerHoldingItem);
    const length = players.length;
    amountOfListeners = length;
    invalidPlayers = 0;
    for (let i = 0; i < length; i++) {
        const [key, info] = players[i] ?? [];
        if (key == undefined || info == undefined)
            continue;
        const { player, playerInv, item, lastSlot, type, typeFunc } = info;
        if (!player.isValid) {
            removePlayerHoldListen(player.id, type);
            continue;
        }
        if (lastSlot != player.selectedSlotIndex) {
            removePlayerHoldListen(player.id, type);
            continue;
        }
        const hand = playerInv.getItem(player.selectedSlotIndex);
        if (!hand || hand.typeId != item.typeId) {
            removePlayerHoldListen(player.id, type);
            continue;
        }
        if (executeTime == maxTick) {
            typeFunc(info);
        }
    }
    if (length == invalidPlayers) {
        amountOfListeners = 0;
        return;
    }
    system.run(() => startInverval(executeTime >= maxTick ? 0 : executeTime + 1));
}
export function addPlayerHoldListen(player, item, slot) {
    const playerInv = player.getComponent(EntityComponentTypes.Inventory)?.container;
    if (!playerInv)
        return;
    const type = HoldItemTypes[item.typeId];
    if (type == undefined)
        return;
    const typeFunc = holdFunctions[type];
    cachePlayerHoldingItem[player.id] = { type, typeFunc, player, playerInv, item, lastSlot: slot };
    amountOfListeners == 0 && startInverval();
}
export function removePlayerHoldListen(playerId, type) {
    invalidPlayers++;
    delete cachePlayerHoldingItem[playerId];
    if (type) {
        const player = world.getEntity(playerId);
        if (!player || !(player instanceof Player))
            return;
        const exe = removePlayerFunc[type];
        exe && exe(player);
    }
}
const holdFunctions = {
    "memory_frag": (info) => { holdMomeryFragment(info); }
};
const removePlayerFunc = {
    "memory_frag": (player) => {
        player.removeTag("echo_rift:can_open_rift");
        player.removeTag("echo_rift:try_open_rift");
    }
};
