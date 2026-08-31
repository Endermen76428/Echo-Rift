import { StructureRotation } from "@minecraft/server";
export const DimensionsRoomsInfo = {
    "echo_rift:forgotten_kingdom": [
        [
            { id: "1.1.0", entry: { x: 0, y: 2, z: 8 }, weight: 1, exits: [
                    { x: 21, y: 2, z: 8, dir: StructureRotation.None }
                ], challenges: [
                    { type: 0, weight: 2 }
                ] },
            { id: "1.7.0", entry: { x: 0, y: 2, z: 11 }, weight: 1, exits: [
                    { x: 21, y: 2, z: 11, dir: StructureRotation.None },
                    { x: 11, y: 2, z: 1, dir: StructureRotation.Rotate270 },
                    { x: 11, y: 2, z: 21, dir: StructureRotation.Rotate90 }
                ], challenges: [
                    { type: 0, weight: 1 }
                ] }
        ]
    ]
};
export const DimensionsStairsInfo = {
    "echo_rift:forgotten_kingdom": [
        [
            { id: "stairs1.0", entry: { x: 0, y: 1, z: 8 }, weight: 1, exits: [
                    { x: 1, y: 10, z: 8, dir: StructureRotation.Rotate180 }
                ], challenges: [] }
        ]
    ]
};
export const DimensionsRoomsMinibossInfo = {
    "echo_rift:forgotten_kingdom": [
        [],
        [
            { id: "mb1.0", entry: { x: 0, y: 2, z: 8 }, weight: 1, exits: [], challenges: [{ type: 0, weight: 1 }] }
        ]
    ]
};
