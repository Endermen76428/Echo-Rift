import { EntityComponentTypes, EquipmentSlot, system, world } from "@minecraft/server";
import { addPlayerHoldListen } from "../functions/holdItem/holdController";
import { addRiftListener } from "../functions/rift/spaceTimeListener";
import { startUpCacheFromScore } from "../functions/startUp";
import { apiScoreboard } from "./math/scoreboard";
import { resetPlayerTags } from "./player/reset";
export const MemoriesVersion = "v0.1.0";
export const equippablesVariables = ["Chest", "Feet", "Head", "Legs", "Offhand"];
export const DefaultRaidTime = 18000;
export const MinPortalFrameSize = { w: 3, h: 4 };
export const MaxPortalFrameSize = { w: 14, h: 18 };
export const MaxDoorSize = { w: 5, h: 7 };
export const HoldItemTypes = {
    "echo_rift:memory_forgotten_kingdom": "memory_frag",
};
export const memoryFragmentIds = [
    "echo_rift:memory_forgotten_kingdom"
];
export const memoryDimensionIndex = {
    "echo_rift:forgotten_kingdom": 0
};
export const RiftRequestsListTier0 = {
    "echo_rift:memory_forgotten_kingdom": [
        { item: "echo_rift:marble", amount: [1, 21] },
        { item: "minecraft:gold_ingot", amount: [5, 16] },
        { item: "minecraft:gold_block", amount: [1, 8] },
        { item: "minecraft:quartz", amount: [10, 21] },
        { item: "minecraft:calcite", amount: [1, 21] },
        { item: "minecraft:amethyst_shard", amount: [4, 21] },
        { item: "minecraft:diamond", amount: [1, 10] },
        { item: "minecraft:coal", amount: [10, 21] },
        { item: "minecraft:iron_sword", amount: [1, 4] },
        { item: "minecraft:iron_ingot", amount: [7, 16] },
        { item: "minecraft:copper_ingot", amount: [3, 18] }
    ]
};
export const RiftRequestItemsTranslate = {
    "echo_rift:marble": "tile.echo_rift:marble.translate",
    "minecraft:gold_ingot": "item.gold_ingot.name",
    "minecraft:gold_block": "tile.gold_block.name",
    "minecraft:quartz": "item.quartz.name",
    "minecraft:calcite": "tile.calcite.name",
    "minecraft:amethyst_shard": "item.amethyst_shard.name",
    "minecraft:diamond": "item.diamond.name",
    "minecraft:coal": "item.coal.name",
    "minecraft:iron_sword": "item.iron_sword.name",
    "minecraft:iron_ingot": "item.iron_ingot.name",
    "minecraft:copper_ingot": "item.copper_ingot.name"
};
export const RiftLevelNames = {
    "echo_rift:forgotten_kingdom": [
        "dimension.echo_rift:forgotten_kingdom.level_1.name",
        "dimension.echo_rift:forgotten_kingdom.level_2.name",
        "dimension.echo_rift:forgotten_kingdom.level_3.name",
        "dimension.echo_rift:forgotten_kingdom.level_4.name",
        "dimension.echo_rift:forgotten_kingdom.level_5.name"
    ]
};
const maxDimensions = 1;
export const dimensionsByIndex = Array.from({ length: maxDimensions });
export const memoryScoreIndex = Array.from({ length: maxDimensions });
export let overworldDimension;
system.run(() => {
    overworldDimension = world.getDimension("overworld");
    const dimensions = Object.keys(memoryDimensionIndex);
    for (let i = 0; i < maxDimensions; i++) {
        const dimensionId = dimensions[i];
        if (dimensionId == undefined)
            continue;
        const index = memoryDimensionIndex[dimensionId];
        if (index == undefined)
            continue;
        const dimension = world.getDimension(dimensionId);
        dimensionsByIndex[index] = dimension;
        const score = apiScoreboard.getObj(dimensionId);
        memoryScoreIndex[index] = score;
        startUpCacheFromScore(dimension, score);
    }
    const players = world.getAllPlayers();
    if (players.length > 0) {
        for (let i = 0, len = players.length; i < len; i++) {
            const player = players[i];
            if (!player)
                continue;
            resetPlayerTags(player);
            const rifts = player.dimension.getEntities({ type: "echo_rift:spacetime_rift", location: player.location, maxDistance: 6 });
            for (let riftI = 0, riftLen = rifts.length; riftI < riftLen; riftI++) {
                const rift = rifts[riftI];
                if (!rift || !rift.isValid)
                    continue;
                addRiftListener(rift);
            }
            const item = player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand);
            if (item?.hasTag("echo_rift:hold_item")) {
                addPlayerHoldListen(player, item, player.selectedSlotIndex);
            }
        }
    }
});
