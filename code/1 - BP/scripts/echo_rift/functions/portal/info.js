const cachePortalInfo = new Map();
export const portalInfo = new class PortalInfo {
    get(pos) {
        return cachePortalInfo.get(`${pos.x},${pos.y},${pos.z}`);
    }
    set(corners) {
        const { min, max } = corners;
        cachePortalInfo;
    }
};
