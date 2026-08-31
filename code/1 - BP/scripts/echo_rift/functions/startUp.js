import { startEventType0KillAll } from "./memory/eventsListener/0_kill";
import { startInterval } from "./memory/timer/interval";
import { roomsCache } from "./memory/roomCache";
export function startUpCacheFromScore(dimension, score) {
    const roomsRaw = [];
    const exits = [];
    const participants = score.getParticipants();
    for (let i = 0, len = participants.length; i < len; i++) {
        const participant = participants[i];
        if (participant == undefined)
            continue;
        const prefix = participant.displayName.slice(0, 2);
        if (prefix == "r-") {
            roomsRaw.push(participant.displayName);
            continue;
        }
        if (prefix == "e-") {
            const parts = participant.displayName.split("/");
            const rot = parts[1];
            const [rawX, rawY, rawZ] = parts[2]?.split(",") ?? [];
            if (rot == undefined || rawX == undefined || rawY == undefined || rawZ == undefined)
                continue;
            const x = parseInt(rawX), y = parseInt(rawY), z = parseInt(rawZ);
            exits.push({ dir: rot, x, y, z });
            continue;
        }
    }
    const sortedRooms = roomsRaw.sort();
    for (let i = 0, len = sortedRooms.length; i < len; i++) {
        const room = sortedRooms[i];
        if (room == undefined)
            continue;
        const parts = room.split("/");
        const [rawX1, rawY1, rawZ1] = parts[1]?.split(",") ?? [];
        const [rawX2, rawY2, rawZ2] = parts[2]?.split(",") ?? [];
        if (rawX1 == undefined || rawX2 == undefined || rawY1 == undefined || rawY2 == undefined || rawZ1 == undefined || rawZ2 == undefined)
            continue;
        const x1 = parseInt(rawX1), y1 = parseInt(rawY1), z1 = parseInt(rawZ1);
        const x2 = parseInt(rawX2), y2 = parseInt(rawY2), z2 = parseInt(rawZ2);
        roomsCache.addNewRoomBound(dimension, { x: x1, y: y1, z: z1 }, { x: x2, y: y2, z: z2 }, 0, true);
    }
    roomsCache.updateExits(dimension, exits);
    startEventType0KillAll(dimension, true);
    startInterval(dimension, true);
}
