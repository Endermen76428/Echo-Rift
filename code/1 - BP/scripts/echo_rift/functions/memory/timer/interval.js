import { EntityComponentTypes, system } from "@minecraft/server";
import { apiScoreboard } from "../../../lib/math/scoreboard";
import { DefaultRaidTime } from "../../../lib/variables";
import { memoryRaidFailed } from "../fail";
const inverserMinute = 1 / 60;
const inversePorcentage = 1000 / 5;
const timerIntervalId = {};
let dimensionsLength = 0;
function runInterval(execution = 0) {
    const timers = Object.entries(timerIntervalId);
    dimensionsLength = timers.length;
    for (let i = 0, len = timers.length; i < len; i++) {
        const [key, info] = timers[i] ?? [];
        if (key == undefined || info == undefined)
            continue;
        const { score, players, stop } = info;
        if (stop) {
            delete timerIntervalId[key];
            dimensionsLength--;
            score.removeParticipant("timer");
            continue;
        }
        info.time--;
        const timeUp = info.time < 0 && execution == 4;
        if (execution == 4) {
            if (!score.hasParticipant("room")) {
                delete timerIntervalId[key];
                dimensionsLength--;
                continue;
            }
            score.setScore("timer", info.time);
            const room = score.getScore("room") ?? 0;
            const roomGoal = score.getScore("rg") ?? 1;
            const roomProgress = score.getScore("rp") ?? 0;
            const roomOffset = Math.floor(room / 6);
            const isMiniBoss = room % 6 == 0 ? 6 : 1;
            const isFinalBoss = room == 25 ? 5 : 1;
            const completed = Math.floor((room - (roomOffset * 6) - 1) * inversePorcentage + Math.floor(roomProgress / roomGoal * 200 * isMiniBoss * isFinalBoss) - 1).toString().padStart(4, "0");
            const roomId = (isMiniBoss == 6 ? (roomOffset * 10) : (roomOffset + 1)).toString().padStart(2, "0");
            const totalTime = Math.floor(info.time * 0.05);
            const timeS = (totalTime % 60).toString().padStart(2, "0");
            const timeM = Math.floor(totalTime * inverserMinute).toString().padStart(2, "0");
            for (let i2 = 0, len2 = players.length; i2 < len2; i2++) {
                const player = players[i2];
                if (player == undefined)
                    continue;
                if (timeUp) {
                    const healthComp = player.getComponent(EntityComponentTypes.Health);
                    const hungerComp = player.getComponent(EntityComponentTypes.Hunger);
                    if (healthComp == undefined || hungerComp == undefined)
                        continue;
                    memoryRaidFailed(player, healthComp, hungerComp);
                }
                else {
                    player.isValid && player.onScreenDisplay.setTitle(`errb:[ ${timeM}:${timeS} ],${completed},${isMiniBoss}${roomOffset},${roomId}`);
                }
            }
        }
        if (timeUp) {
            delete timerIntervalId[key];
            dimensionsLength--;
            continue;
        }
    }
    if (dimensionsLength == 0)
        return;
    system.run(() => { runInterval(execution >= 4 ? 0 : execution + 1); });
}
export function startInterval(dimension, reload = false) {
    const score = apiScoreboard.getObj(dimension.id);
    if (reload) {
        if (!score.hasParticipant("timer"))
            return;
        const scoreTime = score.getScore("timer") ?? DefaultRaidTime;
        timerIntervalId[dimension.id] = { score, time: scoreTime, players: dimension.getPlayers(), stop: false };
    }
    else {
        timerIntervalId[dimension.id] = { score, time: DefaultRaidTime, players: dimension.getPlayers(), stop: false };
        score.setScore("timer", DefaultRaidTime);
    }
    dimensionsLength == 0 && runInterval();
}
export function clearTimerInterval(dimension) {
    const cache = timerIntervalId[dimension.id];
    if (cache)
        cache.stop = true;
}
