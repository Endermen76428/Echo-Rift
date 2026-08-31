import { addReturnRiftListener, removeReturnRiftListener } from "../functions/rift/returnListener";
import { addRiftListener, removeRiftListener } from "../functions/rift/spaceTimeListener";
import { world, system } from "@minecraft/server";
system.afterEvents.scriptEventReceive.subscribe(({ id, message, sourceEntity, sourceBlock }) => {
    const exe = scriptEventFunctions[id];
    if (exe)
        exe(message, sourceEntity, sourceBlock);
}, { namespaces: ["echo_rift"] });
const scriptEventFunctions = {
    "echo_rift:add_rift_listener": (message, entity) => {
        if (!entity || !entity.isValid)
            return;
        addRiftListener(entity);
    },
    "echo_rift:remove_rift_listener": (message, entity) => {
        if (!entity || !entity.isValid)
            return;
        removeRiftListener(entity.id, entity);
    },
    "echo_rift:add_return_rift_listener": (message, entity) => {
        if (!entity || !entity.isValid)
            return;
        addReturnRiftListener(entity);
    },
    "echo_rift:remove_return_rift_listener": (message, entity) => {
        if (!entity || !entity.isValid)
            return;
        removeReturnRiftListener(entity.dimension.id);
    },
    "echo_rift:closing_rift": (message, entity) => {
        if (!entity?.isValid)
            return;
        const tag = `echo_rift:rift${entity.id}`;
        const players = world.getPlayers({ tags: [tag] });
        for (let i = 0, len = players.length; i < len; i++) {
            const player = players[i];
            if (!player || !player.isValid)
                continue;
            player.removeTag(tag);
        }
        entity.remove();
    }
};
