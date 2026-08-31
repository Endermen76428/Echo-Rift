import { EntityComponentTypes, Player, system, world } from "@minecraft/server";
import { sendSacrificeMessage } from "./sacrificeListMessage";
import { teleportToMemory } from "../memory/teleport";
import { apiWarn } from "../../lib/player/warn";
const cacheRifts = {};
let amountOfListeners = 0;
let invalidRifts = 0;
const maxTick = 9;
function startInverval(executeTime = 0) {
    const rifts = Object.entries(cacheRifts);
    const length = rifts.length;
    amountOfListeners = length;
    invalidRifts = 0;
    for (let i = 0; i < length; i++) {
        const [key, info] = rifts[i] ?? [];
        if (key == undefined || info == undefined)
            continue;
        const { type, rift, total, current, displacement, slot0, slot1, slot2, slot3, deny } = info;
        if (!rift.isValid) {
            removeRiftListener(key);
            continue;
        }
        if (executeTime != maxTick)
            continue;
        const riftTag = `echo_rift:rift${rift.id}`;
        const joinTag = `echo_rift:join${rift.id}`;
        const initialPercentage = Math.floor((1 - info.current / total) * 100);
        const players = rift.dimension.getEntities({ type: "minecraft:player", location: rift.location, maxDistance: 6 });
        for (let playerI = 0, playerLen = players.length; playerI < playerLen; playerI++) {
            const player = players[playerI];
            if (!player || !player.isValid || !(player instanceof Player))
                continue;
            if (player.hasTag(riftTag))
                continue;
            player.addTag(riftTag);
            if (current != 0) {
                sendSacrificeMessage(player, initialPercentage, [[slot0.item, slot0.amount], [slot1.item, slot1.amount], [slot2.item, slot2.amount], [slot3.item, slot3.amount]]);
            }
            else {
                if (player.hasTag(joinTag)) {
                    apiWarn.notify(player, "entity.warn.echo_rift:spacetime_rift.unstable.already_failed", { type: "action_bar", sound: "warn.ender_addon_pack:bass" });
                }
                else
                    apiWarn.notify(player, "entity.warn.echo_rift:spacetime_rift.unstable.complete", { type: "action_bar", sound: "warn.ender_addon_pack:orb" });
            }
        }
        if (current != 0) {
            const items = rift.dimension.getEntities({ type: "minecraft:item", location: rift.location, maxDistance: 6 });
            for (let itemI = 0, itemLen = items.length; itemI < itemLen; itemI++) {
                const itemEntity = items[itemI];
                if (!itemEntity || deny.has(itemEntity.id))
                    continue;
                const itemComp = itemEntity.getComponent(EntityComponentTypes.Item)?.itemStack;
                if (!itemComp)
                    return;
                if (slot0.amount != 0 && slot0.item == itemComp.typeId) {
                    const decrement = decrementItem(itemEntity, itemComp, slot0.amount);
                    slot0.amount -= decrement;
                    info.current -= decrement;
                    continue;
                }
                if (slot1.amount != 0 && slot1.item == itemComp.typeId) {
                    const decrement = decrementItem(itemEntity, itemComp, slot1.amount);
                    slot1.amount -= decrement;
                    info.current -= decrement;
                    continue;
                }
                if (slot2.amount != 0 && slot2.item == itemComp.typeId) {
                    const decrement = decrementItem(itemEntity, itemComp, slot2.amount);
                    slot2.amount -= decrement;
                    info.current -= decrement;
                    continue;
                }
                if (slot3.amount != 0 && slot3.item == itemComp.typeId) {
                    const decrement = decrementItem(itemEntity, itemComp, slot3.amount);
                    slot3.amount -= decrement;
                    info.current -= decrement;
                    continue;
                }
                deny.add(itemEntity.id);
            }
            if (current != info.current) {
                rift.setDynamicProperty("cur0", slot0.amount);
                rift.setDynamicProperty("cur1", slot1.amount);
                rift.setDynamicProperty("cur2", slot2.amount);
                rift.setDynamicProperty("cur3", slot3.amount);
                const percentage = Math.floor((1 - info.current / total) * 100);
                if (percentage != 100) {
                    rift.playAnimation("animation.echo_rift.spacetime_rift.pop");
                }
                for (let playerI = 0, playerLen = players.length; playerI < playerLen; playerI++) {
                    const player = players[playerI];
                    if (!player || !player.isValid || !(player instanceof Player))
                        continue;
                    if (percentage != 100) {
                        sendSacrificeMessage(player, percentage, [[slot0.item, slot0.amount], [slot1.item, slot1.amount], [slot2.item, slot2.amount], [slot3.item, slot3.amount]]);
                    }
                    else {
                        if (player.hasTag(joinTag)) {
                            apiWarn.notify(player, "entity.warn.echo_rift:spacetime_rift.unstable.already_failed", { type: "action_bar", sound: "warn.ender_addon_pack:bass" });
                        }
                        else
                            apiWarn.notify(player, "entity.warn.echo_rift:spacetime_rift.unstable.complete", { type: "action_bar", sound: "warn.ender_addon_pack:orb" });
                    }
                }
                rift.dimension.playSound("entity.echo_rift:spacetime_rift.consume", rift.location);
                rift.setProperty("echo_rift:complete", percentage);
            }
            continue;
        }
        if (rift.getProperty("echo_rift:closing") == false)
            rift.triggerEvent("echo_rift:start_close");
        const oppositeDisplacement = displacement == "x" ? "z" : "x";
        const riftAxis = Math.floor(rift.location[displacement]);
        const riftOppositeAxis = rift.location[oppositeDisplacement];
        const width = (r => r * r)((r => typeof r != "number" ? 2 : r)(rift.getProperty("echo_rift:width")) * 0.5);
        for (let playerI = 0, playerLen = players.length; playerI < playerLen; playerI++) {
            const player = players[playerI];
            if (!player || !player.isValid)
                continue;
            if (player.hasTag(joinTag) && player.hasTag(riftTag))
                continue;
            if (!(player instanceof Player))
                continue;
            if (Math.floor(player.location[displacement]) != riftAxis)
                continue;
            const distance = riftOppositeAxis - player.location[oppositeDisplacement];
            if (distance * distance > width)
                continue;
            player.addTag(joinTag);
            teleportToMemory(player, type, rift);
        }
    }
    if (length == invalidRifts) {
        amountOfListeners = 0;
        return;
    }
    system.run(() => startInverval(executeTime >= maxTick ? 0 : executeTime + 1));
}
export function addRiftListener(entity) {
    const type = entity.getProperty("echo_rift:type");
    if (typeof type != "number")
        return;
    const rotate = entity.getProperty("echo_rift:rotate");
    if (typeof rotate != "boolean")
        return;
    const total = entity.getDynamicProperty("total");
    if (typeof total != "number")
        return;
    let current = 0;
    const items = Array.from({ length: 4 });
    for (let i = 0; i < 4; i++) {
        const item = entity.getDynamicProperty(`item${i}`);
        if (typeof item != "string")
            return;
        const amount = entity.getDynamicProperty(`cur${i}`);
        if (typeof amount != "number")
            return;
        items[i] = { item, amount };
        current += amount;
    }
    const emptyItem = { item: "", amount: 0 };
    cacheRifts[entity.id] = {
        type,
        rift: entity,
        total,
        current,
        displacement: rotate ? "z" : "x",
        slot0: items[0] ?? emptyItem,
        slot1: items[1] ?? emptyItem,
        slot2: items[2] ?? emptyItem,
        slot3: items[3] ?? emptyItem,
        deny: new Set()
    };
    amountOfListeners == 0 && startInverval();
}
export function removeRiftListener(entityId, entity) {
    delete cacheRifts[entityId];
    invalidRifts++;
    if (!entity || !entity.isValid)
        return;
    const tag = `echo_rift:rift${entityId}`;
    const players = world.getPlayers({ tags: [tag] });
    for (let i = 0, len = players.length; i < len; i++) {
        const player = players[i];
        if (!player || !player.isValid)
            continue;
        player.removeTag(tag);
    }
}
function decrementItem(entity, item, amount) {
    if (item.amount - amount <= 0) {
        entity.remove();
        return item.amount;
    }
    item.amount -= amount;
    entity.dimension.spawnItem(item, entity.location).clearVelocity();
    entity.remove();
    return amount;
}
