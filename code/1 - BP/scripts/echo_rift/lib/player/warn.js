import { system, world } from "@minecraft/server";
export const apiWarn = new class ApiWarn {
    notify(player, message, options) {
        const type = options && options.type ? options.type : "chat";
        const execute = notifyTypes[type];
        if (execute && message)
            execute(player, message, options?.subtitle);
        system.runTimeout(() => {
            if (options?.sound)
                player.playSound(options.sound, { volume: options.volume });
        }, options?.delaySound);
        system.runTimeout(() => {
            if (options?.particle) {
                const dimension = options.particle.dimension ? world.getDimension(options.particle.dimension) : player.dimension;
                try {
                    dimension.spawnParticle(options.particle.id, options.particle.pos, options.particle.map);
                }
                catch { }
            }
        }, options?.delayParticle);
    }
    playSound(player, sound, options) {
        system.runTimeout(() => {
            player.playSound(sound, { volume: options?.volume ?? 1, location: options?.location });
        }, options?.delaySound);
    }
};
const notifyTypes = {
    "chat"(player, message) { player.sendMessage(typeof message == "string" ? { translate: message } : message); },
    "action_bar"(player, message) { player.onScreenDisplay.setActionBar(typeof message == "string" ? { translate: message } : message); },
    "title"(player, message, subtitle) { player.onScreenDisplay.setTitle(typeof message == "string" ? { translate: message } : message, subtitle); }
};
