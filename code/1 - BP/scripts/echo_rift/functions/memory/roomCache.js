import { memoryDimensionIndex, memoryScoreIndex } from "../../lib/variables";
import { apiScoreboard } from "../../lib/math/scoreboard";
const generatedRoomsCache = {
    "echo_rift:forgotten_kingdom": []
};
export const roomsCache = new class RoomsCache {
    clear(dimension) { generatedRoomsCache[dimension.id] = []; }
    getLastRoom(dimension, shift = 0) {
        const dimensionCache = generatedRoomsCache[dimension.id];
        if (dimensionCache == undefined)
            return;
        return dimensionCache[dimensionCache.length - shift - 1];
    }
    addNewRoomBound(dimension, pos, size, roomIndex, reload = false) {
        const dimensionCache = generatedRoomsCache[dimension.id];
        if (dimensionCache == undefined)
            return;
        const dimensionIndex = memoryDimensionIndex[dimension.id];
        if (dimensionIndex == undefined)
            return;
        const dimensionScore = memoryScoreIndex[dimensionIndex];
        if (dimensionScore == undefined)
            return;
        if (reload) {
            dimensionCache.push({ from: pos, to: size });
            return;
        }
        const x = pos.x + size.x - 1, y = pos.y + size.y - 1, z = pos.z + size.z - 1;
        dimensionCache.push({ from: pos, to: { x, y, z } });
        dimensionScore.setScore(`r-${roomIndex + 1}/${pos.x},${pos.y},${pos.z}/${x},${y},${z}`, roomIndex + 1);
    }
    hasIntersection(dimension, pos, dir, padding = 8) {
        const dimensionCache = generatedRoomsCache[dimension.id];
        if (dimensionCache == undefined)
            return true;
        for (let i = 0, len = dimensionCache.length; i < len; i++) {
            const info = dimensionCache[i];
            if (info == undefined)
                continue;
            const { from, to } = info;
            for (let i2 = 0, len2 = 32 / padding; i2 < len2; i2++) {
                const x = pos.x + (dir.x * i2 * padding);
                const z = pos.z + (dir.z * i2 * padding);
                if (x >= from.x && x <= to.x &&
                    pos.y >= from.y && pos.y <= to.y &&
                    z >= from.z && z <= to.z)
                    return true;
            }
        }
        return false;
    }
    updateExits(dimension, exits) {
        const score = apiScoreboard.getObj(dimension.id);
        const lastRoom = this.getLastRoom(dimension, 1);
        if (lastRoom != undefined) {
            delete lastRoom.exits;
        }
        const participants = score.getParticipants();
        for (let i = 0, len = participants.length; i < len; i++) {
            const participant = participants[i];
            if (participant == undefined)
                continue;
            if (participant.displayName.startsWith("e-") == false)
                continue;
            score.removeParticipant(participant);
        }
        const currentRoom = this.getLastRoom(dimension);
        if (currentRoom == undefined)
            return;
        currentRoom.exits = exits;
        for (let i = 0, len = exits.length; i < len; i++) {
            const door = exits[i];
            if (door == undefined)
                continue;
            score.setScore(`e-${i + 1}/${door.dir}/${door.x},${door.y},${door.z}`, i + 1);
        }
    }
};
