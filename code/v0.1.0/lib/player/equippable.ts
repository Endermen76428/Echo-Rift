import { world, EntityComponentTypes, Player, EquipmentSlot } from "@minecraft/server"

export const apiEquippable = new class ApiEquippable {
  decrement(player: Player, slot: EquipmentSlot, same?: string): void {
    const equippable = player.getComponent(EntityComponentTypes.Equippable)
    if(!equippable) return

    const hand = equippable.getEquipment(slot)
    if(!hand) return

    if(same && hand.typeId != same) return

    if(hand.amount -1 < 1){
      equippable.setEquipment(slot, undefined)
    } else {
      hand.amount--
      equippable.setEquipment(slot, hand)
    }
  }
}