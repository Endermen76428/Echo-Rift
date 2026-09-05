import { Direction, EquipmentSlot } from "@minecraft/server";
import { BlocksOffsetDirection } from "../../lib/variables";
import { apiEquippable } from "../../lib/player/equippable";
export function placeSlab(player, item, block, blockFace, faceLocation) {
    if (blockFace == Direction.Up || blockFace == Direction.Down) {
        if (!block.hasTag("bedrock_awakening:slab")) {
            const offset = BlocksOffsetDirection[blockFace];
            const blockShift = block.offset(offset);
            if (!blockShift || !blockShift.isValid)
                return;
            if (blockShift.typeId != item.typeId)
                return;
            const verticalHalf = blockShift.permutation.getState("minecraft:vertical_half");
            if (verticalHalf == undefined)
                return;
            if (verticalHalf == "top" && blockFace == Direction.Down)
                return;
            if (verticalHalf == "bottom" && blockFace == Direction.Up)
                return;
            if (!apiEquippable.decrement(player, EquipmentSlot.Mainhand, item.typeId))
                return;
            blockShift.setPermutation(blockShift.permutation.withState("bacs:double_slab", true));
            return;
        }
        const verticalHalf = block.permutation.getState("minecraft:vertical_half");
        if (verticalHalf == undefined)
            return;
        if (verticalHalf == "top" && blockFace == Direction.Up)
            return;
        if (verticalHalf == "bottom" && blockFace == Direction.Down)
            return;
        if (block.typeId != item.typeId)
            return;
        block.setPermutation(block.permutation.withState("bacs:double_slab", true));
        const offset = BlocksOffsetDirection[blockFace];
        const blockShift = block.offset(offset);
        if (blockShift && blockShift.isValid) {
            if (blockShift.typeId != item.typeId) {
                apiEquippable.decrement(player, EquipmentSlot.Mainhand, item.typeId);
            }
            else {
                blockShift.setType("minecraft:air");
            }
        }
        return;
    }
    const offset = BlocksOffsetDirection[blockFace];
    const blockShift = block.offset(offset);
    if (!blockShift || !blockShift.isValid)
        return;
    if (blockShift.typeId != item.typeId)
        return;
    const verticalHalf = blockShift.permutation.getState("minecraft:vertical_half");
    if (verticalHalf == undefined)
        return;
    if ((verticalHalf == "bottom" && faceLocation.y > 0.5) || (verticalHalf == "top" && faceLocation.y < 0.5))
        return;
    if (!apiEquippable.decrement(player, EquipmentSlot.Mainhand, item.typeId))
        return;
    blockShift.setPermutation(blockShift.permutation.withState("bacs:double_slab", true));
}
