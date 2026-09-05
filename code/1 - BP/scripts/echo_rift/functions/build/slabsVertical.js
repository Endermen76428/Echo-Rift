import { Direction, EquipmentSlot, system } from "@minecraft/server";
import { apiEquippable } from "../../lib/player/equippable";
import { BlocksOffsetDirection } from "../../lib/variables";
export function placeSlabVertical(event) {
    const { player, itemStack: item, block, blockFace, faceLocation } = event;
    if (item == undefined)
        return;
    if (block.typeId == item.typeId && block.permutation.getState("bacs:double_slab") != true) {
        const cardinalDirection = block.permutation.getState("minecraft:cardinal_direction");
        if (cardinalDirection == undefined)
            return;
        const directionTest = slabsOpossiteDirectionTest[cardinalDirection];
        if (directionTest == blockFace) {
            event.cancel = true;
            system.run(() => {
                if (!apiEquippable.decrement(player, EquipmentSlot.Mainhand, item.typeId))
                    return;
                block.setPermutation(block.permutation.withState("bacs:double_slab", true));
            });
            return;
        }
    }
    const offset = BlocksOffsetDirection[blockFace];
    const blockShift = block.offset(offset);
    if (!blockShift || !blockShift.isValid)
        return;
    if (blockShift.typeId != item.typeId || blockShift.permutation.getState("bacs:double_slab") == true)
        return;
    system.run(() => {
        if (!apiEquippable.decrement(player, EquipmentSlot.Mainhand, item.typeId))
            return;
        blockShift.setPermutation(blockShift.permutation.withState("bacs:double_slab", true));
    });
}
const slabsOpossiteDirectionTest = {
    "south": Direction.North,
    "north": Direction.South,
    "west": Direction.East,
    "east": Direction.West
};
const slabsDirectionTest = {
    "south": Direction.South,
    "north": Direction.North,
    "west": Direction.West,
    "east": Direction.East
};
