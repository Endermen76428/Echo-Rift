import { EntityComponentTypes, EntityDamageCause, EquipmentSlot, Player, system, world } from "@minecraft/server";
import { memoryRaidFailed } from "../functions/memory/fail";
const totemId = "minecraft:totem_of_undying";
world.beforeEvents.entityHurt.subscribe(ev => {
    const { damageSource, hurtEntity: entity } = ev;
    if (entity.typeId == "echo_rift:spacetime_rift" || entity.typeId == "echo_rift:player_inventory") {
        ev.cancel = true;
        return;
    }
    if (entity.typeId == "minecraft:player" && entity instanceof Player && entity.dimension.id.startsWith("echo_rift:")) {
        const equippableComp = entity.getComponent(EntityComponentTypes.Equippable);
        if (equippableComp == undefined)
            return;
        const mainHand = equippableComp.getEquipment(EquipmentSlot.Mainhand)?.typeId;
        const offHand = equippableComp.getEquipment(EquipmentSlot.Offhand)?.typeId;
        if (damageSource.cause != EntityDamageCause.void && (mainHand == totemId || offHand == totemId))
            return;
        const healthComp = entity.getComponent(EntityComponentTypes.Health);
        const hungerComp = entity.getComponent(EntityComponentTypes.Hunger);
        if (healthComp == undefined || hungerComp == undefined || equippableComp == undefined)
            return;
        if (healthComp.currentValue <= 0) {
            ev.cancel = true;
            system.run(() => { memoryRaidFailed(entity, healthComp, hungerComp); });
        }
    }
});
