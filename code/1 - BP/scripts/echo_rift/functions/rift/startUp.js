import { memoryFragmentIds, RiftRequestsListTier0 } from "../../lib/variables";
import { EquipmentSlot, system } from "@minecraft/server";
import { sendSacrificeMessage } from "./sacrificeListMessage";
import { apiEquippable } from "../../lib/player/equippable";
import { apiWarn } from "../../lib/player/warn";
export function riftStartUpFunc(player, item, corners) {
    const type = memoryFragmentIds.findIndex(value => value == item.typeId);
    if (type == -1)
        return;
    const riftRequest = RiftRequestsListTier0[item.typeId];
    if (!riftRequest)
        return;
    apiEquippable.decrement(player, EquipmentSlot.Mainhand, item.typeId);
    const { min, max } = corners;
    const rotate = min.x != max.x;
    const dir = min.x == max.x ? "z" : "x";
    const oppositeDir = min.x != max.x ? "z" : "x";
    const width = max[dir] - min[dir] - 1;
    const height = max.y - min.y - 1;
    min[dir] += (max[dir] - min[dir] - 1) / 2 + 1;
    min[oppositeDir] += 0.5;
    min["y"] += 1;
    const riftEntity = player.dimension.spawnEntity("echo_rift:spacetime_rift", min, { spawnEvent: "echo_rift:initialize_rift", initialRotation: rotate ? 90 : 0 });
    riftEntity.setProperty("echo_rift:rotate", rotate);
    riftEntity.setProperty("echo_rift:width", width);
    riftEntity.setProperty("echo_rift:height", height);
    riftEntity.setProperty("echo_rift:type", type);
    let index = 0;
    let totalAmount = 0;
    const requestLength = riftRequest.length;
    const selectedIndex = Array.from({ length: 16 });
    const items = Array.from({ length: 4 });
    while (index < 4) {
        const random = Math.floor(Math.random() * requestLength);
        if (selectedIndex[random] == true)
            continue;
        selectedIndex[random] = true;
        const info = riftRequest[random];
        if (info == undefined)
            continue;
        const amount = Math.floor(Math.random() * (info.amount[1] - info.amount[0]) + info.amount[0]);
        totalAmount += amount;
        items[index] = [info.item, amount];
        riftEntity.setDynamicProperty(`item${index}`, info.item);
        riftEntity.setDynamicProperty(`cur${index}`, amount);
        index++;
    }
    riftEntity.setDynamicProperty("total", totalAmount);
    apiWarn.playSound(player, "entity.echo_rift:spacetime_rift.active");
    player.addTag(`echo_rift:rift${riftEntity.id}`);
    system.runTimeout(() => {
        sendSacrificeMessage(player, "new", items);
    }, 35);
}
