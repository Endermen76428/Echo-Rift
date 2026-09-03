import { EntityComponentTypes, GameMode } from "@minecraft/server";
export const apiEquippable = new class ApiEquippable {
    decrement(player, slot, same) {
        if (player.getGameMode() == GameMode.Creative)
            return true;
        const equippable = player.getComponent(EntityComponentTypes.Equippable);
        if (!equippable)
            return false;
        const hand = equippable.getEquipment(slot);
        if (!hand)
            return false;
        if (same && hand.typeId != same)
            return false;
        if (hand.amount - 1 < 1) {
            equippable.setEquipment(slot, undefined);
        }
        else {
            hand.amount--;
            equippable.setEquipment(slot, hand);
        }
        return true;
    }
};
