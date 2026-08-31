import { MolangVariableMap, Player, RawMessage, system, TitleDisplayOptions, Vector3, world } from "@minecraft/server"

export const apiWarn = new class ApiWarn {
  notify(player: Player, message: Message, options?: NotifyOptions): void {
    const type = options && options.type ? options.type : "chat"
    const execute = notifyTypes[type]
    if(execute && message) execute(player, message, options?.subtitle)

    system.runTimeout(() => {
      if(options?.sound) player.playSound(options.sound, {volume: options.volume})
    }, options?.delaySound)

    system.runTimeout(() => {
      if(options?.particle){
        const dimension = options.particle.dimension ? world.getDimension(options.particle.dimension) : player.dimension
        try{ dimension.spawnParticle(options.particle.id, options.particle.pos, options.particle.map) } catch {}
      }
    }, options?.delayParticle)
  }

  playSound(player: Player, sound: string, options?: SoundOptions): void {
    system.runTimeout(() => {
      player.playSound(sound, {volume: options?.volume ?? 1, location: options?.location})
    }, options?.delaySound)
  }
}

const notifyTypes: { [key: string]: (player: Player, message: Message, subtitle?: TitleDisplayOptions) => void } = {
  "chat"(player, message){ player.sendMessage(typeof message == "string" ? {translate: message} : message) },

  "action_bar"(player, message){ player.onScreenDisplay.setActionBar(typeof message == "string" ? {translate: message} : message) },

  "title"(player, message, subtitle){ player.onScreenDisplay.setTitle(typeof message == "string" ? {translate: message} : message, subtitle) }
}

type Message = string | RawMessage

interface NotifyOptions extends SoundOptions {
  type?: "chat" | "action_bar" | "title"
  sound?: string
  particle?: { id: string, pos: Vector3, dimension?: string, map?: MolangVariableMap }
  delayParticle?: number
  subtitle?: TitleDisplayOptions
}

interface SoundOptions {
  volume?: number
  delaySound?: number
  location?: Vector3
}