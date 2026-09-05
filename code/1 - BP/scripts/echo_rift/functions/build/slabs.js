import { Direction, EquipmentSlot, system } from "@minecraft/server";
import { BlocksOffsetDirection } from "../../lib/variables";
import { apiEquippable } from "../../lib/player/equippable";
export function placeSlab(event) {
    const { player, itemStack: item, block, blockFace, faceLocation } = event;
    if (item == undefined)
        return;
    if (block.typeId == item.typeId && block.permutation.getState("bacs:double_slab") != true) {
        const verticalHalf = block.permutation.getState("minecraft:vertical_half");
        if (verticalHalf == undefined)
            return;
        const directionTest = slabsDirectionTest[verticalHalf];
        if (directionTest == blockFace) {
            event.cancel = true;
            if (!apiEquippable.decrement(player, EquipmentSlot.Mainhand, item.typeId))
                return;
            system.run(() => {
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
    const verticalHalf = blockShift.permutation.getState("minecraft:vertical_half");
    if (verticalHalf == undefined)
        return;
    console.warn(verticalHalf, faceLocation.y);
    if ((verticalHalf == "bottom" && (faceLocation.y < 0.5 && faceLocation.y != 0)) || (verticalHalf == "top" && faceLocation.y > 0.5))
        return;
    if (!apiEquippable.decrement(player, EquipmentSlot.Mainhand, item.typeId))
        return;
    system.run(() => {
        blockShift.setPermutation(blockShift.permutation.withState("bacs:double_slab", true));
    });
}
const slabsDirectionTest = {
    "bottom": Direction.Up,
    "top": Direction.Down
};
