import { StructureRotation } from "@minecraft/server"

export function rotateStructureRotate(dir: StructureRotation, rot: StructureRotation): StructureRotation {
  if(rot == StructureRotation.None) return dir

  let currentDir: StructureRotation
  if(rot == StructureRotation.Rotate90 || rot == StructureRotation.Rotate270){
    currentDir = rotate90[dir] ?? StructureRotation.None
  } else {
    currentDir = dir
  }

  if(rot == StructureRotation.Rotate180 || rot == StructureRotation.Rotate270){
    currentDir = rotateOpposite[currentDir] ?? StructureRotation.Rotate180
  }

  return currentDir
}

const rotate90: Record<string, StructureRotation> = {
  "None": StructureRotation.Rotate90,
  "Rotate90": StructureRotation.Rotate180,
  "Rotate180": StructureRotation.Rotate270,
  "Rotate270": StructureRotation.None
}
const rotateOpposite: Record<string, StructureRotation> = {
  "None": StructureRotation.Rotate180,
  "Rotate180": StructureRotation.None,
  "Rotate90": StructureRotation.Rotate270,
  "Rotate270": StructureRotation.Rotate90
}

// East > South > West > North