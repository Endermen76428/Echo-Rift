import { StructureRotation } from "@minecraft/server";
export function rotateVector(pos, size, rot) {
    if (rot == StructureRotation.Rotate90)
        return {
            x: size.z - pos.z - 1,
            y: pos.y,
            z: pos.x
        };
    if (rot == StructureRotation.Rotate180)
        return {
            x: size.x - pos.x - 1,
            y: pos.y,
            z: size.z - pos.z - 1
        };
    if (rot == StructureRotation.Rotate270)
        return {
            x: pos.z,
            y: pos.y,
            z: size.x - pos.x - 1
        };
    return pos;
}
export function rotateSize(size, rot) {
    if (rot == StructureRotation.Rotate90 || rot == StructureRotation.Rotate270)
        return {
            x: size.z,
            y: size.y,
            z: size.x
        };
    return size;
}
