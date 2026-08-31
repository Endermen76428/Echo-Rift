export const portalStructureFunction = new class PortalStructureFunction {
    initAnimation(player, item, corners) {
        const portalId = portalEntityList[item.typeId];
        if (!portalId)
            return;
        const { min, max } = corners;
        const rotated = min.x != max.x;
        const dir = min.x == max.x ? "z" : "x";
        const oppositeDir = min.x != max.x ? "z" : "x";
        const width = max[dir] - min[dir] - 1;
        const height = max.y - min.y - 1;
        min[dir] += (max[dir] - min[dir] - 1) / 2 + 1;
        min[oppositeDir] += 0.5;
        min["y"] += 1;
        player.removeTag("echo_rift:try_open_rift");
        const portalEntity = player.dimension.spawnEntity("echo_rift:unknown_rift", min, { spawnEvent: "echo_rift:initialize_rift" });
        portalEntity.setProperty("echo_rift:rotated", rotated);
        portalEntity.setProperty("echo_rift:width", width);
        portalEntity.setProperty("echo_rift:height", height);
    }
};
const portalEntityList = {
    "echo_rift:memory_frag_forgotten_kingdom": "echo_rift:forgotten_kingdom_portal"
};
