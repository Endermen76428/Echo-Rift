import { system, world } from "@minecraft/server";
import { rotateSize, rotateVector } from "../../../lib/math/vector";
import { startEventListener } from "../eventsListener/controller";
import { apiScoreboard } from "../../../lib/math/scoreboard";
import { randomWeightIndex } from "../../../lib/math/random";
import { DimensionsRoomsMinibossInfo } from "../rooms";
import { clamp } from "../../../lib/math/number";
import { roomsCache } from "../roomCache";
import { dirRotation } from "./default";
export function generateRoomMiniboss(dimension, exit, dir) {
    const score = apiScoreboard.getObj(dimension.id);
    const currentRoom = apiScoreboard.getScore(score, "room");
    const currentLevel = clamp(Math.floor(currentRoom * 0.2), 0, 5);
    const rotation = dirRotation[dir];
    if (rotation == undefined)
        return;
    const minibossRooms = DimensionsRoomsMinibossInfo[dimension.id]?.[currentLevel];
    if (minibossRooms == undefined)
        return console.error("§cFaltando salas do nível:§r", currentLevel);
    const randomIndex = randomWeightIndex(minibossRooms.map(value => value.weight));
    const roomInfo = minibossRooms[randomIndex];
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
    roomsCache.updateExits(dimension, []);
    score.setScore("room", currentRoom + 1);
}
