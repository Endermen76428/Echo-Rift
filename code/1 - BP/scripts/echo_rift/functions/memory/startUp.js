import { StructureRotation, world } from "@minecraft/server";
import { randomWeightIndex } from "../../lib/math/random";
import { roomsCache } from "./roomCache";
const tickPos1 = { x: 0, y: 0, z: -3 }, tickPos2 = { x: 0, y: 8, z: 3 };
export function startUpDimension(dimension, forceReset = false) {
    if (!world.tickingAreaManager.hasTickingArea(dimension.id))
        world.tickingAreaManager.createTickingArea(dimension.id, { dimension, from: tickPos1, to: tickPos2 });
    const startRomInfoList = startRoomLocations[dimension.id];
    if (startRomInfoList == undefined)
        return;
    const entities = dimension.getEntities({ excludeTypes: ["minecraft:player", forceReset ? "echo_rift:player_inventory" : "minecraft:player"] });
    for (let i = 0, len = entities.length; i < len; i++) {
        const entity = entities[i];
        if (entity == undefined || !entity.isValid)
            continue;
        entity.remove();
    }
    const randomIndex = randomWeightIndex(startRomInfoList.map(info => info.weight));
    const startRomInfo = startRomInfoList[randomIndex];
    if (startRomInfo == undefined)
        return;
    const { id, pos, exit, deadZoneEnd } = startRomInfo;
    const memoryId = dimension.id.slice(10);
    world.structureManager.place(`mystructure:echo_rift/dimension/${memoryId}/${id}`, dimension, pos);
    roomsCache.addNewRoomBound(dimension, { x: pos.x, y: -64, z: -256 }, { x: deadZoneEnd - pos.x + 1, y: 384, z: 512 }, -1);
}
const startRoomLocations = {
    "echo_rift:forgotten_kingdom": [
        { id: "1.0.0", pos: { x: -4, y: -2, z: -12 }, exit: { x: 21, y: 0, z: 0, dir: StructureRotation.None }, deadZoneEnd: 20, weight: 1 }
    ]
};
