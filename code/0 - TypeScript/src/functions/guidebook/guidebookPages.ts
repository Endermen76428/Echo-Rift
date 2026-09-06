export const guidebookInfo: GuidebookPages = {
  title: "main",
  buttons: [
    { // 0
      title: "general",
      path: "info",
      buttons: [
        { directory: [1] } // Rifts List
      ]
    },
    { // 1
      title: "raids_list",
      path: "C:textures/echo_rift/entity/rift/forgotten_kingdom",
      body: false,
      buttons: [
        { // 1, 0
          title: "forgotten_kingdom",
          path: "C:textures/echo_rift/items/memory/forgotten_kingdom",
          buttons: [
            { // 1, 0, 0
              title: "marble_cave",
              path: "C:textures/echo_rift/blocks/dimension/forgotten_kingdom/decoration/marble"
            },
            { // 1, 0, 1
              title: "memory",
              path: "C:textures/echo_rift/items/memory/forgotten_kingdom",
              buttons: [
                { directory: [1, 0, 0] } // Marble Cave
              ]
            },
            { // 1, 0, 2
              title: "rift",
              path: "C:textures/echo_rift/entity/rift/forgotten_kingdom",
              buttons: [
                { directory: [1, 0, 0] } // Marble Cave
              ]
            }
          ]
        }
      ]
    }
  ]
}



export interface GuidebookPages extends Buttons {
  title?: string
  body?: false | string
  header?: string
  buttons?: GuidebookPages[]
}

interface Buttons {
  path?: false | string
  labelB?: string
  labelA?: string
  dividerB?: true
  dividerA?: true
  directory?: number[]
}