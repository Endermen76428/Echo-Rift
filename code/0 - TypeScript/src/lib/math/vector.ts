import { StructureRotation, Vector3 } from "@minecraft/server"

export function rotateVector(pos: Vector3, size: Vector3, rot: StructureRotation): Vector3 {
  if(rot == StructureRotation.Rotate90) return {
    x: size.z - pos.z - 1,
    y: pos.y,
    z: pos.x
  }

  if(rot == StructureRotation.Rotate180) return {
    x: size.x - pos.x - 1,
    y: pos.y,
    z: size.z - pos.z - 1
  }

  if(rot == StructureRotation.Rotate270) return {
    x: pos.z,
    y: pos.y,
    z: size.x - pos.x - 1
  }

  return pos
}

export function rotateSize(size: Vector3, rot: StructureRotation): Vector3 {
  if(rot == StructureRotation.Rotate90 || rot == StructureRotation.Rotate270) return {
    x: size.z,
    y: size.y,
    z: size.x
  }

  return size
}