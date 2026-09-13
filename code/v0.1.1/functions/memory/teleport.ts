import { dimensionsByIndex, memoryScoreIndex, MemoriesVersion, equippablesVariables } from "../../lib/variables"
import { Entity, EntityComponentTypes, EquipmentSlot, Player, system, world } from "@minecraft/server"
import { startUpDimension } from "./startUp"
import { apiWarn } from "../../lib/player/warn"

const defaultLocation = {x: 0.5, y: 1.5, z: 0.5}
const deathScreenLocation = {x: 0, y: 4095, z: 0}

export function teleportToMemory(player: Player, type: number, rift: Entity): void {
  const dimension = dimensionsByIndex[type]
  const dimensionScore = memoryScoreIndex[type]
  if(dimension == undefined || dimensionScore == undefined) return

  const initialized = dimensionScore.hasParticipant(MemoriesVersion)

  player.setDynamicProperty("er:pos", player.location)
  player.setDynamicProperty("er:dim", player.dimension.id)

  player.teleport(defaultLocation, {dimension: dimension})

  // Remove as entitades antigas
  const oldEntity = player.dimension.getEntities({tags: [player.id]})
  for(let i = 0, len = oldEntity.length; i < len; i++){
    const entity = oldEntity[i]
    entity && entity.isValid && entity.remove()
  }

  // Ajusta a rotação do jogador ocultando o sendCommandFeedback para não aparecer no chat o comando
  const currentGameRule = world.gameRules.sendCommandFeedback
  if(currentGameRule) world.gameRules.sendCommandFeedback = false
  player.runCommand("tp @s ~~~ -90 0") // Por algum carai o rotation do script não funciona então tem que fazer isso
  if(currentGameRule) world.gameRules.sendCommandFeedback = true

  system.runTimeout(() => {
    if(initialized == false){
      startUpDimension(dimension)
      dimensionScore.setScore(MemoriesVersion, 0)
    }

    // Faz o backup do inventario do player
    const backupEntity = player.dimension.spawnEntity("echo_rift:player_inventory", player.location)
    const playerInv = player.getComponent(EntityComponentTypes.Inventory)?.container
    const playerEquip = player.getComponent(EntityComponentTypes.Equippable)
    const entityInv = backupEntity.getComponent(EntityComponentTypes.Inventory)?.container

    if(playerInv && playerEquip && entityInv){
      backupEntity.addTag(`echo_rift:${player.id}`)
      for(let i = 0, len = playerInv.size; i < len; i++){
        const item = playerInv.getItem(i)
        item && entityInv.setItem(i, item)
      }

      const invSize = entityInv.size
      for(let i = 0; i < 5; i++){
        const equip = equippablesVariables[i]
        if(equip == undefined) continue

        const item = playerEquip.getEquipment(equip as EquipmentSlot)
        item && entityInv.setItem(invSize -i -1, item)
      }
    }

    backupEntity.teleport(deathScreenLocation)
  }, 5)

  // Reseta as informações da ultima raid caso o player não tenha saido do mundo
  apiWarn.notify(player, "errb:0", {type: "title"})

  // Testa se resta algum player fora de qualquer memoria para que a fissura seja removida
  const riftTag = `echo_rift:rift${rift.id}`
  const joinTag = `echo_rift:join${rift.id}`
  const allPlayers = world.getPlayers()
  let removeRift = true
  for(let i = 0, len = allPlayers.length; i < len; i++){
    const player = allPlayers[i]
    if(player == undefined) continue

    if(!player.dimension.id.startsWith("echo_rift:")){
      if(player.hasTag(riftTag) && player.hasTag(joinTag)) continue
      removeRift = false
      break
    }
  }

  if(removeRift && rift.isValid){
    rift.remove()
    // world.getPlayers({tags: []})
  }
}