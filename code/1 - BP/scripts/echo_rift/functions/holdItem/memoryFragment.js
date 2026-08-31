import { BlockVolume } from "@minecraft/server";
import { MaxPortalFrameSize, MinPortalFrameSize } from "../../lib/variables";
import { riftStartUpFunc } from "../rift/startUp";
import { apiWarn } from "../../lib/player/warn";
export function holdMomeryFragment(info) {
    const { player, item } = info;
    if (player.hasTag("echo_rift:can_open_rift"))
        return;
    const portalFrameId = portalFrameList[item.typeId];
    if (!portalFrameId)
        return;
    const { x: cX, y: cY, z: cZ } = player.location;
    const blocksIterator = player.dimension.getBlocks(new BlockVolume({ x: cX + 32, y: cY + 32, z: cZ + 32 }, { x: cX - 32, y: cY - 32, z: cZ - 32 }), { includeTypes: [portalFrameId] }, true);
    const blocks = blocksIterator.getBlockLocationIterator();
    let alreadyActivated = false;
    let portalCorners;
    for (let i = 0, len = blocksIterator.getCapacity(); i < len; i++) {
        const pos = blocks.next().value;
        portalCorners = getCorners(player.dimension, pos, portalFrameId);
        if (portalCorners != undefined) {
            const { min, max } = portalCorners;
            const dir = min.x == max.x ? "z" : "x";
            const oppositeDir = min.x != max.x ? "z" : "x";
            const middle = { ...min };
            middle[dir] += (max[dir] - min[dir] - 1) / 2 + 1;
            middle[oppositeDir] += 0.5;
            middle["y"] += 1;
            if (player.dimension.getEntities({ location: middle, maxDistance: 2, families: ["echo_rift:rift"] }).length > 0) {
                alreadyActivated = true;
                portalCorners = undefined;
            }
            else {
                break;
            }
        }
    }
    if (portalCorners == undefined) {
        player.removeTag("echo_rift:try_open_rift");
        return apiWarn.notify(player, "item.warn.echo_rift:memory_fragment.reacting.fail", { type: "action_bar" });
    }
    const { min, max } = portalCorners;
    const dir = min.x == max.x ? "z" : "x";
    if (alreadyActivated && portalCorners == undefined)
        return apiWarn.notify(player, "item.warn.echo_rift:memory_fragment.reacting.already_activated", { type: "action_bar" });
    const disX = Math.max(0, max.x - min.x - 1), disY = Math.max(0, max.y - min.y - 1), disZ = Math.max(0, max.z - min.z - 1);
    const targetPos = { ...min };
    targetPos.y += 1;
    targetPos[dir] += 1;
    for (let y = min.y + 1, lenY = min.y + 1 + disY; y < lenY; y++) {
        targetPos["y"] = y;
        for (let offset = min[dir] + 1, lenOff = min[dir] + 1 + (disX || disZ); offset < lenOff; offset++) {
            targetPos[dir] = offset;
            const targetBlock = player.dimension.getBlock(targetPos);
            if (!targetBlock || targetBlock.typeId != "minecraft:air") {
                return apiWarn.notify(player, "item.warn.echo_rift:memory_fragment.reacting.obstructed", { type: "action_bar" });
            }
        }
    }
    if (player.hasTag("echo_rift:try_open_rift")) {
        riftStartUpFunc(player, item, portalCorners);
        return;
    }
    player.addTag("echo_rift:can_open_rift");
    apiWarn.notify(player, "item.warn.echo_rift:memory_fragment.reacting.success", { type: "action_bar" });
}
function getCorners(dimension, pos, portalId) {
    const { w: minW, h: minH } = MinPortalFrameSize;
    const { w: maxW, h: maxH } = MaxPortalFrameSize;
    let widthBlock = undefined;
    for (let i = 0; i < 4; i++) {
        const offset = widthDirections[i];
        if (offset == undefined)
            continue;
        for (let w = minW; w < maxW; w++) {
            const targetBlock = dimension.getBlock({ x: pos.x + (offset.x * w), y: pos.y, z: pos.z + (offset.z * w) });
            if (targetBlock == undefined)
                continue;
            if (targetBlock.isValid == false)
                break;
            if (targetBlock.typeId != portalId)
                continue;
            widthBlock = targetBlock;
            break;
        }
        if (widthBlock != undefined)
            break;
    }
    if (widthBlock == undefined)
        return;
    let heightBlock = undefined;
    for (let i = 0; i < 2; i++) {
        const offset = heightDirections[i];
        if (offset == undefined)
            continue;
        for (let y = minW; y < maxH; y++) {
            const targetBlock = dimension.getBlock({ x: pos.x, y: pos.y + (offset * y), z: pos.z });
            if (targetBlock == undefined)
                continue;
            if (targetBlock.isValid == false)
                break;
            if (targetBlock.typeId != portalId)
                continue;
            heightBlock = targetBlock;
            break;
        }
        if (heightBlock != undefined)
            break;
    }
    if (heightBlock == undefined)
        return;
    const heightWidthBlock = dimension.getBlock({ x: widthBlock.x, y: heightBlock.y, z: widthBlock.z });
    if (heightWidthBlock == undefined)
        return;
    if (heightWidthBlock.isValid == false)
        return;
    if (heightWidthBlock.typeId != portalId)
        return;
    return {
        min: { x: Math.min(pos.x, widthBlock.x, heightBlock.x, heightWidthBlock.x), y: Math.min(pos.y, widthBlock.y, heightBlock.y, heightWidthBlock.y), z: Math.min(pos.z, widthBlock.z, heightBlock.z, heightWidthBlock.z) },
        max: { x: Math.max(pos.x, widthBlock.x, heightBlock.x, heightWidthBlock.x), y: Math.max(pos.y, widthBlock.y, heightBlock.y, heightWidthBlock.y), z: Math.max(pos.z, widthBlock.z, heightBlock.z, heightWidthBlock.z) }
    };
}
const portalFrameList = {
    "echo_rift:memory_forgotten_kingdom": "echo_rift:forgotten_kingdom_portal_corner"
};
const widthDirections = [
    { x: 0, z: -1 },
    { x: 0, z: 1 },
    { x: 1, z: 0 },
    { x: -1, z: 0 }
];
const heightDirections = [
    1,
    -1
];
