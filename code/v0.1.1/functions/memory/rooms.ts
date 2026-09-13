import { StructureRotation, Vector3 } from "@minecraft/server"

// Rotate270 é Norte e 90 é Sul
export const DimensionsRoomsInfo: { [key: string]: IRoomsInfo[][] } = {
  "echo_rift:forgotten_kingdom": [
    [ // Tier 0, menos de 5 salas geradas
      { id: "1.1.0", entry: {x: 0, y: 2, z: 8}, weight: 1, exits: [
        {x: 21, y: 2, z: 8, dir: StructureRotation.None}
      ], challenges: [
        { type: 0, weight: 2 }
      ] },
      // { id: "1.2.0", entry: {x: 0, y: 1, z: 8}, weight: 1, exits: [
      //   {x: 11, y: 1, z: 18, dir: StructureRotation.Rotate90}
      // ], challenges: [
      //   { type: 0, weight: 1 }
      // ] },
      // { id: "1.3.0", entry: {x: 0, y: 1, z: 10}, weight: 1, exits: [
      //   {x: 11, y: 1, z: 0, dir: StructureRotation.Rotate270}
      // ], challenges: [
      //   { type: 0, weight: 1 }
      // ] },
      // { id: "1.4.0", entry: {x: 0, y: 1, z: 8}, weight: 1, exits: [
      //   {x: 21, y: 1, z: 8, dir: StructureRotation.None},
      //   {x: 11, y: 1, z: 18, dir: StructureRotation.Rotate90}
      // ], challenges: [
      //   { type: 0, weight: 1 }
      // ] },
      // { id: "1.5.0", entry: {x: 0, y: 1, z: 10}, weight: 1, exits: [
      //   {x: 21, y: 1, z: 10, dir: StructureRotation.None},
      //   {x: 11, y: 1, z: 0, dir: StructureRotation.Rotate270}
      // ], challenges: [
      //   { type: 0, weight: 1 }
      // ] },
      // { id: "1.6.0", entry: {x: 0, y: 1, z: 10}, weight: 1, exits: [
      //   {x: 11, y: 1, z: 0,  dir: StructureRotation.Rotate270},
      //   {x: 11, y: 1, z: 20, dir: StructureRotation.Rotate90}
      // ], challenges: [
      //   { type: 0, weight: 1 }
      // ] },
      { id: "1.7.0", entry: {x: 0, y: 2, z: 11}, weight: 1, exits: [
        {x: 21, y: 2, z: 11, dir: StructureRotation.None},
        {x: 11, y: 2, z: 1,  dir: StructureRotation.Rotate270},
        {x: 11, y: 2, z: 21, dir: StructureRotation.Rotate90}
      ], challenges: [
        { type: 0, weight: 1 }
      ] }
    ]
  ]
}

export const DimensionsStairsInfo: { [key: string]: IRoomsInfo[][] } = {
  "echo_rift:forgotten_kingdom": [
    [
      { id: "stairs1.0", entry: {x: 0, y: 1, z: 8}, weight: 1, exits: [
        {x: 1, y: 10, z: 8, dir: StructureRotation.Rotate180}
      ], challenges: [] }
    ]
  ]
}

export const DimensionsRoomsMinibossInfo: { [key: string]: IRoomsInfo[][] } = {
  "echo_rift:forgotten_kingdom": [
    [], // Não tem miniboss no nível 0, é meio estranho, mas o sistema funciona assim, o miniboss tecnicamente é a porta de entrada pra nova área e não a saida de uma
    [
      { id: "mb1.0", entry: {x: 0, y: 2, z: 8}, weight: 1, exits: [
      ], challenges: [ {type: 0, weight: 1} ] }
    ]
  ]
}



interface IRoomsInfo {
  id: string
  weight: number
  entry: Vector3 // Posição relativa ao canto 0, 0, 0 da estrutura
  exits: IDoorInfo[] // Posição relativa ao canto 0, 0, 0 da estrutura
  challenges: IChallenge[]
}

interface IChallenge {
  type: number
  weight: number
}

/*
0 = Matar todos os mobs
*/

export interface IDoorInfo extends Vector3 {
  dir: StructureRotation
}