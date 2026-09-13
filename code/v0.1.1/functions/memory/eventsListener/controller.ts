import { startEventType0KillAll } from "./0_kill"
import { Dimension } from "@minecraft/server"

export function startEventListener(dimension: Dimension, type: number, reload = false): void {
  const exe = eventsList[type]
  exe && exe(dimension, reload)
}

const eventsList: { [key: number]: (dimension: Dimension, reload: boolean) => void } = {
  0: (dimension, reload) => { startEventType0KillAll(dimension, reload) },

  // Miniboss
  // 1: (dimension, reload) => { startEventType0KillAll(dimension, reload) }
}