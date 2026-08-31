import { startEventType0KillAll } from "./0_kill";
export function startEventListener(dimension, type, reload = false) {
    const exe = eventsList[type];
    exe && exe(dimension, reload);
}
const eventsList = {
    0: (dimension, reload) => { startEventType0KillAll(dimension, reload); },
};
