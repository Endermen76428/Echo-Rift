import { StructureRotation, system, world } from "@minecraft/server";
import { DimensionsRoomsInfo, DimensionsStairsInfo } from "../rooms";
import { rotateStructureRotate } from "../../../lib/block/rotation";
import { rotateSize, rotateVector } from "../../../lib/math/vector";
import { startEventListener } from "../eventsListener/controller";
import { apiScoreboard } from "../../../lib/math/scoreboard";
import { randomWeightIndex } from "../../../lib/math/random";
import { MaxDoorSize } from "../../../lib/variables";
import { startInterval } from "../timer/interval";
import { clamp } from "../../../lib/math/number";
import { roomsCache } from "../roomCache";
import { generateRoomMiniboss } from "./miniboss";
let preventWatchdog = 0;
let test = false;
export function generateNextRoom(dimension, exit, dir, exclude = new Set()) {
    const score = apiScoreboard.getObj(dimension.id);
    const currentRoom = apiScoreboard.getScore(score, "room");
    const currentLevel = clamp(Math.floor(currentRoom * 0.2), 0, 5);
    const rotation = dirRotation[dir];
    if (rotation == undefined)
        return;
    if (currentRoom == 0) {
        system.run(() => {
            startInterval(dimension);
        });
        dimension.spawnEntity("echo_rift:return_rift", { x: -0.5, y: 1, z: 0.5 });
    }
    if ((currentRoom + 1) % 6 == 0) {
        generateRoomMiniboss(dimension, exit, dir);
        return;
    }
    if (currentRoom == 24) {
        console.warn("Gerar Sala Final Boss");
        return;
    }
    const roomsTier = DimensionsRoomsInfo[dimension.id]?.[currentLevel];
    if (roomsTier == undefined)
        return console.error("§cFaltando salas do nível:§r", currentLevel);
    const randomIndex = randomWeightIndex(roomsTier.map(value => value.weight));
    const roomInfo = roomsTier[randomIndex];
    if (roomInfo == undefined)
        return;
    const memoryId = dimension.id.slice(10);
    const { id, entry, exits, challenges } = roomInfo;
    const structure = world.structureManager.get(`mystructure:echo_rift/dimension/${memoryId}/${id}`);
    if (structure == undefined)
        return console.error("§cFailed to get structure:§r", memoryId, id);
    const size = structure.size;
    const newEntry = rotateVector(entry, size, rotation);
    const minX = exit.x - newEntry.x, minY = exit.y - newEntry.y, minZ = exit.z - newEntry.z;
    const minPos = { x: minX, y: minY, z: minZ };
    world.structureManager.place(structure, dimension, minPos, { rotation });
    const doorOffsetW = Math.floor(MaxDoorSize.w * 0.5);
    let doorsLength = exits.length;
    const placedExits = [];
    for (let i = 0, len = exits.length; i < len; i++) {
        const door = exits[i];
        if (door == undefined)
            continue;
        const newDir = rotateStructureRotate(door.dir, rotation);
        const offset = dirOffset[newDir];
        const offsetForward = dirForward[newDir];
        if (offset == undefined || offsetForward == undefined)
            continue;
        const newEntry = rotateVector(door, size, rotation);
        const x = minX + newEntry.x - (doorOffsetW * offset.x), y = minY + newEntry.y, z = minZ + newEntry.z - (doorOffsetW * offset.z);
        if (roomsCache.hasIntersection(dimension, { x, y, z }, offsetForward)) {
            doorsLength--;
            continue;
        }
        placedExits.push({ x, y, z, dir: newDir });
    }
    if (doorsLength == 0) {
        exclude.add(randomIndex);
        if (exclude.size == roomsTier.length || preventWatchdog++ > 25) {
            return generateStairs(dimension, exit, dir);
        }
        return generateNextRoom(dimension, exit, dir, exclude);
    }
    preventWatchdog = 0;
    const challengeIndex = randomWeightIndex(challenges.map(value => value.weight));
    const { type } = challenges[challengeIndex] ?? {};
    if (type == undefined)
        return console.warn("§cFalta Evento para a sala:§r", id);
    score.setScore("rg", 1);
    score.setScore("rp", 0);
    system.runTimeout(() => {
        startEventListener(dimension, type);
    }, 2);
    const rotatedSize = rotateSize(size, rotation);
    roomsCache.addNewRoomBound(dimension, { x: minX, y: minY, z: minZ }, rotatedSize, currentRoom);
    roomsCache.updateExits(dimension, placedExits);
    score.setScore("room", currentRoom + 1);
}
function generateStairs(dimension, exit, dir) {
    const score = apiScoreboard.getObj(dimension.id);
    const currentRoom = apiScoreboard.getScore(score, "room");
    const currentLevel = clamp(Math.floor(currentRoom * 0.2), 0, 5);
    const rotation = dirRotation[dir];
    if (rotation == undefined)
        return;
    const roomsTier = DimensionsStairsInfo[dimension.id]?.[currentLevel];
    if (roomsTier == undefined)
        return console.warn("§cFaltando escadas do nível:§r", roomsTier);
    const randomIndex = randomWeightIndex(roomsTier.map(value => value.weight));
    const roomInfo = roomsTier[randomIndex];
    if (roomInfo == undefined)
        return;
    const memoryId = dimension.id.slice(10);
    const { id, entry, exits } = roomInfo;
    const structure = world.structureManager.get(`mystructure:echo_rift/dimension/${memoryId}/${id}`);
    if (structure == undefined)
        return console.error("§cFailed to get structure:§r", memoryId, id);
    const size = structure.size;
    const newEntry = rotateVector(entry, size, rotation);
    const minX = exit.x - newEntry.x, minY = exit.y - newEntry.y, minZ = exit.z - newEntry.z;
    world.structureManager.place(structure, dimension, { x: minX, y: minY, z: minZ }, { rotation });
    for (let i = 0, len = exits.length; i < len; i++) {
        const exit = exits[i];
        if (exit == undefined)
            continue;
        const newDir = rotateStructureRotate(exit.dir, rotation);
        const newEntry = rotateVector(exit, size, rotation);
        generateNextRoom(dimension, { x: newEntry.x + minX, y: newEntry.y + minY, z: newEntry.z + minZ }, newDir);
    }
}
export function generateDoors(dimension, exits) {
    for (let i = 0, len = exits.length; i < len; i++) {
        const door = exits[i];
        if (door == undefined)
            continue;
        world.structureManager.place(`mystructure:echo_rift/dimension/door`, dimension, { x: door.x, y: door.y, z: door.z }, { rotation: door.dir });
    }
}
export const dirRotation = {
    "east": StructureRotation.None,
    "south": StructureRotation.Rotate90,
    "west": StructureRotation.Rotate180,
    "north": StructureRotation.Rotate270,
    "Rotate270": StructureRotation.Rotate270,
    "Rotate90": StructureRotation.Rotate90,
    "Rotate180": StructureRotation.Rotate180,
    "None": StructureRotation.None
};
const dirOffset = {
    "Rotate270": { x: 1, z: 0 },
    "Rotate90": { x: 1, z: 0 },
    "Rotate180": { x: 0, z: 1 },
    "None": { x: 0, z: 1 }
};
const dirForward = {
    "Rotate270": { x: 0, z: -1 },
    "Rotate90": { x: 0, z: 1 },
    "Rotate180": { x: -1, z: 0 },
    "None": { x: 1, z: 0 }
};
