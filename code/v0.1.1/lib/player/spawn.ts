import { DimensionLocation, Player, world } from "@minecraft/server";

export function getPlayerSpawnLocation(player: Player): DimensionLocation {
  const spawnLocation = player.getSpawnPoint()
  if(spawnLocation) return spawnLocation

  const pos = (r => typeof r != "object" ? undefined : r)(player.getDynamicProperty("er:pos"))
  const dim = (r => typeof r != "string" ? undefined : r)(player.getDynamicProperty("er:dim"))

  if(pos && dim){
    player.setDynamicProperty("er:pos", undefined)
    player.setDynamicProperty("er:dim", undefined)
    return {dimension: world.getDimension(dim), x: pos.x, y: pos.y, z: pos.z}
  }

  // Só executa em casos extremos
  return {dimension: world.getDimension("overworld"), x: 0, y: 64, z: 0}
}