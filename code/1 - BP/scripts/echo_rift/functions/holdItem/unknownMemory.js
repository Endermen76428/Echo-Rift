import { BlockVolume } from "@minecraft/server";
import { MaxPortalFrameSize, MinPortalFrameSize } from "../../lib/variables";
import { apiWarn } from "../../lib/player/warn";
export function holdMomeryFragment(info) {
    const { player, item } = info;
    const portalFrameId = portalFrameList[item.typeId];
    if (!portalFrameId)
        return;
    const { x: cX, y: cY, z: cZ } = player.location;
    const blocksIterator = player.dimension.getBlocks(new BlockVolume({ x: cX + 47, y: cY + 47, z: cZ + 47 }, { x: cX - 48, y: cY - 48, z: cZ - 48 }), { includeTypes: [portalFrameId] }, true);
    const blocks = blocksIterator.getBlockLocationIterator();
    let portalCorners;
    for (let i = 0, len = blocksIterator.getCapacity(); i < len; i++) {
        const pos = blocks.next().value;
        portalCorners = getCorners(player.dimension, pos, portalFrameId);
        if (portalCorners != undefined)
            break;
    }
    if (portalCorners != undefined) {
        const { min, max } = portalCorners;
        const disX = Math.max(0, max.x - min.x - 1), disY = Math.max(0, max.y - min.y - 1), disZ = Math.max(0, max.z - min.z - 1);
        const areaSize = (disX || 1) * disY * (disZ || 1);
        const innerBlocks = player.dimension.getBlocks(new BlockVolume({ x: min.x + (disX == 0 ? 0 : 1), y: min.y + 1, z: min.z + (disZ == 0 ? 0 : 1) }, { x: min.x + disX, y: min.y + disY, z: min.z + disZ }), { includeTypes: ["minecraft:air"] });
        if (areaSize != innerBlocks.getCapacity())
            return apiWarn.notify(player, "item.warn.echo_rift:memory_fragment.reacting.obstructed", { type: "actionbar" });
        apiWarn.notify(player, "item.warn.echo_rift:memory_fragment.reacting.success", { type: "actionbar" });
        return;
    }
    apiWarn.notify(player, "item.warn.echo_rift:memory_fragment.reacting.fail", { type: "actionbar" });
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
