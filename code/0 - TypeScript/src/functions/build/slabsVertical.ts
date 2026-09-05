import { Block, Direction, EquipmentSlot, ItemStack, Player, Vector3 } from "@minecraft/server"
import { apiEquippable } from "../../lib/player/equippable"
import { BlocksOffsetDirection } from "../../lib/variables"

export function placeSlabVertical(player: Player, item: ItemStack, block: Block, blockFace: Direction, faceLocation: Vector3): void {
  if(block.typeId == item.typeId){
    const cardinalDirection = block.permutation.getState("minecraft:cardinal_direction")
    if(cardinalDirection == undefined) return

    const directionTest = slabsOpossiteDirectionTest[cardinalDirection]
    if(directionTest != blockFace) return

    block.setPermutation(block.permutation.withState("bacs:double_slab", true))
    const offset = BlocksOffsetDirection[blockFace]
    const blockShift = block.offset(offset)

    if(blockShift && blockShift.isValid){
      if(blockShift.typeId != item.typeId){
        apiEquippable.decrement(player, EquipmentSlot.Mainhand, item.typeId)
      } else {
        blockShift.setType("minecraft:air")
      }
    }
    return
  }

  const offset = BlocksOffsetDirection[blockFace]
  const blockShift = block.offset(offset)
  if(!blockShift || !blockShift.isValid) return

  const cardinalDirection = blockShift.permutation.getState("minecraft:cardinal_direction")
  if(cardinalDirection == undefined) return

  const directionTest = slabsDirectionTest[cardinalDirection]
  console.warn(cardinalDirection, blockFace, JSON.stringify(faceLocation))
  if(directionTest != blockFace){
    if(blockFace == Direction.Down || blockFace == Direction.Up){
      if(cardinalDirection == "north" && faceLocation.z < 0.5) return
      if(cardinalDirection == "south" && faceLocation.z > 0.5) return
      if(cardinalDirection == "west" && faceLocation.x < 0.5) return
      if(cardinalDirection == "east" && faceLocation.x > 0.5) return
      console.warn("Teste baixo cima")
    }
    // return
  }

  // Se ele não conseguir decrementar o item, não faz nada
  if(!apiEquippable.decrement(player, EquipmentSlot.Mainhand, item.typeId)) return
  blockShift.setPermutation(blockShift.permutation.withState("bacs:double_slab", true))
}

const slabsOpossiteDirectionTest: { [key: string]: Direction } = {
  "south": Direction.North,
  "north": Direction.South,
  "west": Direction.East,
  "east": Direction.West
}
const slabsDirectionTest: { [key: string]: Direction } = {
  "south": Direction.South,
  "north": Direction.North,
  "west": Direction.West,
  "east": Direction.East
}