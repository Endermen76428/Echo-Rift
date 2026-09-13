import { Block, BlockVolume, Dimension, Vector3, VectorXZ } from "@minecraft/server"
import { MaxPortalFrameSize, MinPortalFrameSize } from "../../lib/variables"
import { IPlayerHoldItemInfo } from "./holdController"
import { riftStartUpFunc } from "../rift/startUp"
import { apiWarn } from "../../lib/player/warn"

export function holdMomeryFragment(info: IPlayerHoldItemInfo): void {
  const { player, item } = info

  // Se o player já tiver encontrado um portal ele não tentará novamente, mas quando interagir ele fará uma segunda verificação para caso o player tenha saido do alcance do portal
  if(player.hasTag("echo_rift:can_open_rift")) return

  const portalFrameId = portalFrameList[item.typeId]
  if(!portalFrameId) return

  // Pega todos os blocos do portal desse fragmento num raio de 32 blocos
  const { x: cX, y: cY, z: cZ } = player.location
  const blocksIterator = player.dimension.getBlocks(new BlockVolume({x: cX +32, y: cY +32, z: cZ +32}, {x: cX -32, y: cY -32, z: cZ -32}), {includeTypes: [portalFrameId]}, true)
  const blocks = blocksIterator.getBlockLocationIterator()

  let alreadyActivated = false
  let portalCorners: TPortalCorners | undefined
  for(let i = 0, len = blocksIterator.getCapacity(); i < len; i++){
    const pos: Vector3 = blocks.next().value
    // Tem que fazer um sistema de cache aqui pra não verificar os corners de portais já ativos de novo 
    portalCorners = getCorners(player.dimension, pos, portalFrameId)
    if(portalCorners != undefined){
      const { min, max } = portalCorners

      // console.warn("Aqui precisa fazer uma verificação de obstrução, para caso o portal esteja obstruido ele procurar o proximo")
      const dir = min.x == max.x ? "z" : "x"
      const oppositeDir = min.x != max.x ? "z" : "x"

      const middle = {...min}
      middle[dir] += (max[dir] - min[dir] -1) /2 +1
      middle[oppositeDir] += 0.5
      middle["y"] += 1
      if(player.dimension.getEntities({location: middle, maxDistance: 2, families: ["echo_rift:rift"]}).length > 0){
        alreadyActivated = true
        portalCorners = undefined
      } else {
        break // Se encontrar um portal valido ignorará todos os proximos blocos
      }
    }
  }

  if(portalCorners == undefined){
    player.removeTag("echo_rift:try_open_rift")
    return apiWarn.notify(player, "item.warn.echo_rift:memory_fragment.reacting.fail", {type: "action_bar"})
  }

  const { min, max } = portalCorners

  const dir = min.x == max.x ? "z" : "x"

  if(alreadyActivated && portalCorners == undefined) return apiWarn.notify(player, "item.warn.echo_rift:memory_fragment.reacting.already_activated", {type: "action_bar"})

  // Pega as dimensões do portal para verificar se não está obstruido
  const disX = Math.max(0, max.x - min.x -1), disY = Math.max(0, max.y - min.y -1), disZ = Math.max(0, max.z - min.z -1)

  const targetPos: Vector3 = {...min}
  targetPos.y += 1
  targetPos[dir] += 1
  // Percorrerá toda a area interna do portal para verificar se ele está limpo e pode ser ativo
  for(let y = min.y +1, lenY = min.y +1 + disY; y < lenY; y++){
    targetPos["y"] = y
    for(let offset = min[dir] +1, lenOff = min[dir] +1 + (disX || disZ); offset < lenOff; offset++){
      targetPos[dir] = offset
      const targetBlock = player.dimension.getBlock(targetPos)
      if(!targetBlock || targetBlock.typeId != "minecraft:air"){
        return apiWarn.notify(player, "item.warn.echo_rift:memory_fragment.reacting.obstructed", {type: "action_bar"})
      }
    }
  }

  // Só começa a executar depois que foi encontrado um portal valido e tenha interagido com o item
  if(player.hasTag("echo_rift:try_open_rift")){
    riftStartUpFunc(player, item, portalCorners)
    return
  }

  // Essa tag serve para quando interagir com o fragmento permitir fazer a segunda checagem do portal e comaçar a executar a abertura do portal
  player.addTag("echo_rift:can_open_rift")
  apiWarn.notify(player, "item.warn.echo_rift:memory_fragment.reacting.success", {type: "action_bar"})
}

function getCorners(dimension: Dimension, pos: Vector3, portalId: string): TPortalCorners | undefined {
  const { w: minW, h: minH } = MinPortalFrameSize
  const { w: maxW, h: maxH } = MaxPortalFrameSize

  let widthBlock: Block | undefined = undefined
  for(let i = 0; i < 4; i++){
    const offset = widthDirections[i]
    if(offset == undefined) continue

    for(let w = minW; w < maxW; w++){
      const targetBlock = dimension.getBlock({x: pos.x + (offset.x * w), y: pos.y, z: pos.z + (offset.z * w)})
      if(targetBlock == undefined) continue
      if(targetBlock.isValid == false) break

      if(targetBlock.typeId != portalId) continue
      widthBlock = targetBlock
      break
    }
    if(widthBlock != undefined) break
  }

  // Se não encotrar em nenhum das 4 direções é porque o portal está incompleto
  if(widthBlock == undefined) return

  let heightBlock: Block | undefined = undefined
  for(let i = 0; i < 2; i++){
    const offset = heightDirections[i]
    if(offset == undefined) continue

    for(let y = minW; y < maxH; y++){
      const targetBlock = dimension.getBlock({x: pos.x, y: pos.y + (offset * y), z: pos.z})
      if(targetBlock == undefined) continue
      if(targetBlock.isValid == false) break

      if(targetBlock.typeId != portalId) continue
      heightBlock = targetBlock
      break
    }
    if(heightBlock != undefined) break
  }

  // Se não encontrar em cima ou em baixo é porque o portal está incompleto
  if(heightBlock == undefined) return

  const heightWidthBlock = dimension.getBlock({x: widthBlock.x, y: heightBlock.y, z: widthBlock.z})
  if(heightWidthBlock == undefined) return
  if(heightWidthBlock.isValid == false) return
  if(heightWidthBlock.typeId != portalId) return

  return {
    min: {x: Math.min(pos.x, widthBlock.x, heightBlock.x, heightWidthBlock.x), y: Math.min(pos.y, widthBlock.y, heightBlock.y, heightWidthBlock.y), z: Math.min(pos.z, widthBlock.z, heightBlock.z, heightWidthBlock.z)},
    max: {x: Math.max(pos.x, widthBlock.x, heightBlock.x, heightWidthBlock.x), y: Math.max(pos.y, widthBlock.y, heightBlock.y, heightWidthBlock.y), z: Math.max(pos.z, widthBlock.z, heightBlock.z, heightWidthBlock.z)}
  }
}



const portalFrameList: { [key: string]: string } = {
  "echo_rift:memory_forgotten_kingdom": "echo_rift:forgotten_kingdom_portal_corner"
}

const widthDirections: [VectorXZ, VectorXZ, VectorXZ, VectorXZ] = [
  { x:  0, z: -1 }, // North
  { x:  0, z:  1 }, // South
  { x:  1, z:  0 }, // East
  { x: -1, z:  0 }  // West
]

const heightDirections: [number, number] = [
   1, // Up
  -1  // Down
]



export type TPortalCorners = { min: Vector3, max: Vector3 }