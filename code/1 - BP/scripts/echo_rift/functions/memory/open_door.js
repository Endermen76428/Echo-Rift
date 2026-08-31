import { BlockPermutation, BlockVolume } from "@minecraft/server";
import { MaxDoorSize } from "../../lib/variables";
import { generateNextRoom } from "./rooms/default";
import { roomsCache } from "./roomCache";
export function openDoor(block) {
    const dir = block.permutation.getState("minecraft:cardinal_direction");
    if (dir == undefined)
        return;
    const maxW = MaxDoorSize.w, maxH = MaxDoorSize.h;
    const offset = dirOffset[dir];
    if (offset == undefined)
        return;
    let minCorner = block;
    for (let i = 1, len = maxW; i < len; i++) {
        const x = block.x - (offset.x * i);
        const z = block.z - (offset.z * i);
        const checkBlock = block.dimension.getBlock({ x, y: block.y, z });
        if (checkBlock == undefined || checkBlock.typeId != "echo_rift:door")
            break;
        minCorner = checkBlock;
    }
    for (let i = 1, len = maxH; i < len; i++) {
        const checkBlock = block.dimension.getBlock({ x: minCorner.x, y: minCorner.y - 1, z: minCorner.z });
        if (checkBlock == undefined || checkBlock.typeId != "echo_rift:door")
            break;
        minCorner = checkBlock;
    }
    const { exits } = roomsCache.getLastRoom(block.dimension) ?? {};
    if (exits && exits.length > 1) {
        for (let i = 0, len = exits.length; i < len; i++) {
            const exit = exits[i];
            if (exit == undefined)
                continue;
            if (minCorner.x == exit.x && minCorner.y == exit.y && minCorner.z == exit.z)
                continue;
            const offset = dirOffset[exit.dir];
            if (offset == undefined)
                continue;
            block.dimension.fillBlocks(new BlockVolume(exit, { x: exit.x + (offset.x * maxW) - offset.x, y: exit.y + maxH - 1, z: exit.z + (offset.z * maxW) - offset.z }), BlockPermutation.resolve("echo_rift:door", { "echo_rift:close": true }), { ignoreChunkBoundErrors: true });
        }
    }
    generateNextRoom(block.dimension, { x: minCorner.x + Math.floor(maxW * 0.5) * offset.x, y: minCorner.y, z: minCorner.z + Math.floor(maxW * 0.5) * offset.z }, dir);
}
const dirOffset = {
    "north": { x: 1, z: 0 },
    "south": { x: 1, z: 0 },
    "west": { x: 0, z: 1 },
    "east": { x: 0, z: 1 },
    "Rotate270": { x: 1, z: 0 },
    "Rotate90": { x: 1, z: 0 },
    "Rotate180": { x: 0, z: 1 },
    "None": { x: 0, z: 1 }
};
