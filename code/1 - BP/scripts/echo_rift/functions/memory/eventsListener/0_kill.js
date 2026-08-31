import { BlockVolume, EntityComponentTypes, world } from "@minecraft/server";
import { randomBetween, randomWeightIndex } from "../../../lib/math/random";
import { apiScoreboard } from "../../../lib/math/scoreboard";
import { generateDoors } from "../rooms/default";
import { roomsCache } from "../roomCache";
const entityDie = {};
const entityHurt = {};
export function startEventType0KillAll(dimension, reload = false) {
    const score = apiScoreboard.getObj(dimension.id);
    const roomInfo = roomsCache.getLastRoom(dimension);
    if (roomInfo == undefined)
        return;
    const lastEventDieId = entityDie[dimension.id];
    const lastEventHurtId = entityHurt[dimension.id];
    lastEventDieId != undefined && world.afterEvents.entityDie.unsubscribe(lastEventDieId);
    lastEventHurtId != undefined && world.afterEvents.entityHurt.unsubscribe(lastEventHurtId);
    let spawnedEntities = [];
    let life = 0;
    if (reload) {
        spawnedEntities = dimension.getEntities({ tags: ["echo_rift:need_kill"] });
        for (let i = 0, len = spawnedEntities.length; i < len; i++) {
            const entity = spawnedEntities[i];
            if (entity == undefined)
                continue;
            life += entity.getComponent(EntityComponentTypes.Health)?.currentValue ?? 0;
        }
    }
    else {
        const blocksInfo = dimension.getBlocks(new BlockVolume(roomInfo.from, roomInfo.to), { includeTags: ["echo_rift:spawner"] });
        const blocksIterator = blocksInfo.getBlockLocationIterator();
        const randomMobsList = ((score.getScore("room") ?? 1) % 6 == 0 ? minibossList : mobsList)[dimension.id];
        if (randomMobsList == undefined)
            return;
        for (let i = 0, len = blocksInfo.getCapacity(); i < len; i++) {
            const pos = blocksIterator.next().value;
            const block = dimension.getBlock(pos);
            if (block == undefined || !block.isValid)
                continue;
            const spawnLevel = block.permutation.getState("echo_rift:spawn_level");
            if (spawnLevel == undefined)
                continue;
            block.setType("minecraft:air");
            const mobsList = randomMobsList[spawnLevel];
            const mobIndex = randomWeightIndex(mobsList.map(value => value.weight));
            const mob = mobsList[mobIndex];
            if (mob == undefined)
                continue;
            const randomX = randomBetween(-2, 2);
            const randomZ = randomBetween(-2, 2);
            const entity = dimension.spawnEntity(mob.id, { x: block.x + 0.5 + randomX, y: block.y + 0.5, z: block.z + 0.5 + randomZ });
            entity.addTag("echo_rift:need_kill");
            life += entity.getComponent(EntityComponentTypes.Health)?.currentValue ?? 0;
            spawnedEntities.push(entity);
        }
    }
    if (spawnedEntities.length == 0)
        return;
    score.setScore("enemies", spawnedEntities.length);
    if (reload == false)
        score.setScore("rg", life * 1000);
    const eventHurtId = world.afterEvents.entityHurt.subscribe(({ hurtEntity, damage }) => {
        if (!hurtEntity.isValid || !hurtEntity.hasTag("echo_rift:need_kill"))
            return;
        const health = hurtEntity.getComponent(EntityComponentTypes.Health);
        if (health == undefined)
            return;
        const currentLife = health.currentValue;
        const lastLife = (r => typeof r != "number" ? health.effectiveMax : r)(hurtEntity.getDynamicProperty("life"));
        score.addScore("rp", (lastLife - currentLife) * 1000);
        hurtEntity.setDynamicProperty("life", currentLife);
    });
    const eventDieId = world.afterEvents.entityDie.subscribe(({ deadEntity, damageSource }) => {
        if (!deadEntity.isValid || !deadEntity.hasTag("echo_rift:need_kill"))
            return;
        score.addScore("enemies", -1);
        if (score.getScore("enemies") == 0) {
            roomInfo.exits && generateDoors(dimension, roomInfo.exits);
            score.setScore("rg", life * 1000);
            world.afterEvents.entityDie.unsubscribe(eventDieId);
            world.afterEvents.entityHurt.unsubscribe(eventHurtId);
            delete entityDie[dimension.id];
            delete entityHurt[dimension.id];
        }
    });
    entityDie[dimension.id] = eventDieId;
    entityHurt[dimension.id] = eventHurtId;
}
const mobsList = {
    "echo_rift:forgotten_kingdom": [
        [
            { id: "echo_rift:zombie_miner", weight: 1 },
            { id: "echo_rift:marble_silverfish", weight: 1 }
        ],
        [],
        [],
        []
    ]
};
const minibossList = {
    "echo_rift:forgotten_kingdom": [
        [
            { id: "echo_rift:marble_silverfish_empress", weight: 1 }
        ],
        [],
        [],
        []
    ]
};
