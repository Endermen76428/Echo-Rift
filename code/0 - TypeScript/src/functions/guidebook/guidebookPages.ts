import { world } from "@minecraft/server"

const addonId = "digital_miner"

export const guidebookInfo: GuidebookPages = {
  title: "main",
  buttons: [
    { // 0
      title: "how_work",
      path: "works",
      buttons: [
        { // 0, 0
          title: "digital_miner",
          path: "C:textures/digital_miner/ui/guidebook/main/crafts/digital_miner",
          buttons: [
            { directory: [1, 0, 0] }, // Digital Miner
            { // 0, 0, 1
              title: "filter",
              path: "C:textures/digital_miner/ui/filter",
              buttons: [
                { title: "type", path: false }, // 0, 0, 1, 0
                { title: "tag", path: false }, // 0, 0, 1, 1
                { title: "remove", path: false } // 0, 0, 1, 2
              ]
            },
            { // 0, 0, 2
              title: "upgrades",
              path: "C:textures/digital_miner/ui/upgrades",
              buttons: [
                { // 0, 0, 2, 0
                  title: "speed",
                  path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_2",
                  buttons: [
                    { directory: [1, 1, 1] } // Speed Upgrade
                  ]
                },
                { // 0, 0, 2, 1
                  title: "stack",
                  path: "C:textures/digital_miner/items/machines/upgrades/stack/stack_2",
                  buttons: [
                    { directory: [1, 1, 2] } // Stack Upgrade
                  ]
                },
                { // 0, 0, 2, 2
                  title: "fortune",
                  path: "C:textures/digital_miner/items/machines/upgrades/fortune/fortune_2",
                  buttons: [
                    { directory: [1, 1, 3] } // Fortune Upgrade
                  ]
                },
                { // 0, 0, 2, 3
                  title: "silk_touch",
                  path: "C:textures/digital_miner/items/machines/upgrades/silk_touch/silk_touch_2",
                  buttons: [
                    { directory: [1, 1, 4] } // Silk Touch Upgrade
                  ]
                }
              ]
            },
            { // 0, 0, 3
              title: "settings",
              path: "C:textures/digital_miner/ui/settings"
            }
          ]
        },
        { // 0, 1
          title: "ore_scanner",
          path: "C:textures/digital_miner/items/tools/ore_scanner"
        }
      ]
    },
    { // 1
      title: "craft",
      path: "crafts",
      buttons: [
        { // 1, 0
          title: "machines",
          path: "C:textures/digital_miner/ui/guidebook/main/crafts/digital_miner",
          buttons: [
            { // 1, 0, 0
              title: "digital_miner",
              path: "C:textures/digital_miner/ui/guidebook/main/crafts/digital_miner",
              buttons: [
                { // 1, 0, 0, 0
                  title: "resource_amount",
                  path: "C:textures/items/raw_iron"
                },
                { directory: [1, 3, 1, 0] }, // Steel Plate
                { // 1, 0, 0, 2
                  title: "monitor",
                  path: "C:textures/digital_miner/items/machines/digital_miner/monitor/monitor",
                  buttons: [
                    { directory: [1, 3, 1, 0, 1] }, // Steel Ingot
                    { // 1, 0, 0, 2, 1
                      title: "integrated_circuit",
                      path: "C:textures/digital_miner/items/machines/digital_miner/monitor/integrated_circuit",
                      buttons: [
                        { // 1, 0, 0, 2, 1, 0
                          title: "capacitor",
                          path: "C:textures/digital_miner/items/machines/digital_miner/monitor/capacitor",
                          buttons: [
                            { directory: [1, 3, 1, 0, 2] } // Steel Nugget
                          ]
                        },
                        { directory: [1, 3, 1, 0, 2] } // Steel Nugget
                      ]
                    },
                    { // 1, 0, 0, 2, 2
                      title: "diamond_glass",
                      path: "C:textures/digital_miner/blocks/glass/diamond_glass",
                      buttons: [
                        { directory: [1, 3, 0, 4] } // Diamond Dust
                      ]
                    }
                  ]
                },
                { // 1, 0, 0, 3
                  title: "digital_processor",
                  path: "C:textures/digital_miner/items/machines/digital_miner/digital_processor/digital_processor",
                  buttons: [
                    { // 1, 0, 0, 3, 0
                      title: "advanced_circuit",
                      path: "C:textures/digital_miner/items/machines/digital_miner/digital_processor/advanced_circuit",
                      buttons: [
                        { directory: [1, 0, 0, 2, 1] }, // Integrated Circuit
                        { // 1, 0, 0, 3, 0, 1
                          title: "redstone_enriched_quartz",
                          path: "C:textures/digital_miner/items/ore/redstone_enriched_quartz"
                        },
                        { directory: [1, 3, 1, 2] } // Diamond Plate
                      ]
                    },
                    { directory: [1, 3, 1, 0] }, // Steel Plate
                    { directory: [1, 3, 1, 1] }, // Gold Plate
                    { directory: [1, 3, 1, 2] } // Diamond Plate
                  ]
                },
                { // 1, 0, 0, 4
                  title: "machine_engine",
                  path: "C:textures/digital_miner/items/machines/digital_miner/machine_engine/machine_engine",
                  buttons: [
                    { directory: [1, 3, 1, 0, 0] } // Steel Block
                  ]
                },
                { // 1, 0, 0, 5
                  title: "laser_drill",
                  path: "C:textures/digital_miner/items/machines/digital_miner/laser_drill/laser_drill",
                  buttons: [
                    { directory: [1, 3, 1, 0] }, // Steel Plate
                    { directory: [1, 3, 1, 0, 1] }, // Steel Ingot
                    {
                      title: "light_generator",
                      path: "C:textures/digital_miner/ui/guidebook/main/crafts/light_generator",
                      buttons: [
                        { directory: [1, 3, 1, 0, 0] } // Steel Block
                      ]
                    },
                    { directory: [1, 0, 0, 3, 0, 1] }, // Redstone Enriched Quartz
                    { directory: [1, 0, 0, 2, 2] } // Diamond Glass
                  ]
                }
              ]
            },
            { // 1, 0, 1
              title: "ore_scanner",
              path: "C:textures/digital_miner/items/tools/ore_scanner",
              buttons: [
                { directory: [1, 3, 1, 0, 0] } // Steel Block
              ]
            }
          ]
        },
        { // 1, 1
          title: "upgrades",
          path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_2",
          buttons: [
            { // 1, 1, 0
              title: "template",
              path: "C:textures/digital_miner/items/machines/upgrades/template",
              buttons: [
                { directory: [1, 3, 0, 0] }, // Coal Dust
                { directory: [1, 3, 1, 0, 1] }, // Steel Ingot
                { directory: [1, 3, 1, 0] }, // Steel Plate
                { directory: [1, 3, 1, 1] }, // Gold Plate
                { directory: [1, 3, 1, 2] }, // Diamond Plate
                { directory: [1, 0, 0, 2, 1] }, // Integrated Circuit
              ]
            },
            { // 1, 1, 1
              title: "speed",
              path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_4",
              buttons: [
                { // 1, 1, 1, 0
                  title: "speed_1",
                  path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_1",
                  buttons: [
                    { directory: [1, 1, 0] }, // Upgrade Template
                    { directory: [1, 3, 1, 0, 0] }, // Steel Block
                    { directory: [1, 3, 1, 0, 1] } // Steel ingot
                  ]
                },
                { // 1, 1, 1, 1
                  title: "speed_2",
                  path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_2",
                  buttons: [
                    { directory: [1, 1, 1, 0] }, // Speed Upgrade Tier 1
                    { directory: [1, 3, 1, 0, 0] } // Steel Block
                  ]
                },
                { // 1, 1, 1, 2
                  title: "speed_3",
                  path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_3",
                  buttons: [
                    { directory: [1, 1, 1, 1] }, // Speed Upgrade Tier 2
                    { directory: [1, 3, 1, 0] }, // Steel Plate
                    { directory: [1, 3, 1, 0, 0] } // Steel Block
                  ]
                },
                { // 1, 1, 1, 3
                  title: "speed_4",
                  path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_4",
                  buttons: [
                    { directory: [1, 1, 1, 2] }, // Speed Upgrade Tier 3
                    { directory: [1, 3, 1, 0] } // Steel Plate
                  ]
                }
              ]
            },
            { // 1, 1, 2
              title: "stack",
              path: "C:textures/digital_miner/items/machines/upgrades/stack/stack_4",
              buttons: [
                { // 1, 1, 2, 0
                  title: "stack_1",
                  path: "C:textures/digital_miner/items/machines/upgrades/stack/stack_1",
                  buttons: [
                    { directory: [1, 1, 0] }, // Upgrade Template
                    { directory: [1, 3, 1, 0, 0] }, // Steel Block
                    { directory: [1, 3, 1, 0, 1] } // Steel ingot
                  ]
                },
                { // 1, 1, 2, 1
                  title: "stack_2",
                  path: "C:textures/digital_miner/items/machines/upgrades/stack/stack_2",
                  buttons: [
                    { directory: [1, 1, 2, 0] }, // Stack Upgrade Tier 1
                    { directory: [1, 3, 1, 0, 0] } // Steel Block
                  ]
                },
                { // 1, 1, 2, 2
                  title: "stack_3",
                  path: "C:textures/digital_miner/items/machines/upgrades/stack/stack_3",
                  buttons: [
                    { directory: [1, 1, 2, 1] }, // Stack Upgrade Tier 2
                    { directory: [1, 3, 1, 0] }, // Steel Plate
                    { directory: [1, 3, 1, 0, 0] } // Steel Block
                  ]
                },
                { // 1, 1, 2, 3
                  title: "stack_4",
                  path: "C:textures/digital_miner/items/machines/upgrades/stack/stack_4",
                  buttons: [
                    { directory: [1, 1, 2, 2] }, // Stack Upgrade Tier 3
                    { directory: [1, 3, 1, 0] } // Steel Plate
                  ]
                }
              ]
            },
            { // 1, 1, 3
              title: "fortune",
              path: "C:textures/digital_miner/items/machines/upgrades/fortune/fortune_4",
              buttons: [
                { // 1, 1, 3, 0
                  title: "fortune_1",
                  path: "C:textures/digital_miner/items/machines/upgrades/fortune/fortune_2",
                  buttons: [
                    { directory: [1, 1, 0] }, // Upgrade Template
                    { directory: [1, 3, 1, 0, 0] } // Steel Block
                  ]
                },
                { // 1, 1, 3, 1
                  title: "fortune_2",
                  path: "C:textures/digital_miner/items/machines/upgrades/fortune/fortune_3",
                  buttons: [
                    { directory: [1, 1, 3, 0] }, // Fortune Upgrade Tier 1
                    { directory: [1, 3, 1, 0] }, // Steel Plate
                    { directory: [1, 3, 1, 0, 0] } // Steel Block
                  ]
                },
                { // 1, 1, 3, 2
                  title: "fortune_3",
                  path: "C:textures/digital_miner/items/machines/upgrades/fortune/fortune_4",
                  buttons: [
                    { directory: [1, 1, 3, 1] }, // Fortune Upgrade Tier 2
                    { directory: [1, 3, 1, 0] } // Steel Plate
                  ]
                }
              ]
            },
            { // 1, 1, 4
              title: "silk_touch",
              path: "C:textures/digital_miner/items/machines/upgrades/silk_touch/silk_touch_1",
              buttons: [
                { directory: [1, 1, 0] }, // Upgrade Template
                { directory: [1, 3, 1, 0, 0] } // Steel Block
              ]
            }
          ]
        },
        { // 1, 2
          title: "tools",
          path: "C:textures/digital_miner/items/tools/hammer",
          buttons: [
            { // 1, 2, 0
              title: "hammer",
              path: "C:textures/digital_miner/items/tools/hammer"
            }
          ]
        },
        { // 1, 3
          title: "ore",
          path: "C:textures/items/diamond",
          buttons: [
            { // 1, 3, 0
              title: "dust",
              path: "C:textures/digital_miner/items/ore/steel/steel_dust",
              buttons: [
                { // 1, 3, 0, 0
                  title: "coal",
                  path: "C:textures/digital_miner/items/ore/coal_dust",
                  buttons: [
                    { directory: [1, 2, 0] } // Hammer
                  ]
                },
                { // 1, 3, 0, 1
                  title: "iron",
                  path: "C:textures/digital_miner/items/ore/iron_dust",
                  buttons: [
                    { directory: [1, 2, 0] } // Hammer
                  ]
                },
                { // 1, 3, 0, 2
                  title: "steel",
                  path: "C:textures/digital_miner/items/ore/steel/steel_dust",
                  buttons: [
                    { directory: [1, 2, 0] }, // Hammer
                    { directory: [1, 3, 0, 0] }, // Coal Dust
                    { directory: [1, 3, 0, 1] } // Iron Dust
                  ]
                },
                { // 1, 3, 0, 3
                  title: "gold",
                  path: "C:textures/digital_miner/items/ore/gold/gold_dust",
                  buttons: [
                    { directory: [1, 2, 0] } // Hammer
                  ]
                },
                { // 1, 3, 0, 4
                  title: "diamond",
                  path: "C:textures/digital_miner/items/ore/diamond/diamond_dust",
                  buttons: [
                    { directory: [1, 2, 0] } // Hammer
                  ]
                }
              ]
            },
            { // 1, 3, 1
              title: "plate",
              path: "C:textures/digital_miner/items/ore/steel/steel_plate",
              buttons: [
                { // 1, 3, 1, 0
                  title: "steel_plate",
                  path: "C:textures/digital_miner/items/ore/steel/steel_plate",
                  buttons: [
                    { // 1, 3, 1, 0, 0
                      title: "steel_block",
                      path: "C:textures/digital_miner/blocks/ore/steel/steel_block",
                      buttons: [
                        { directory: [1, 3, 1, 0, 1] } // Steel ingot
                      ]
                    },
                    { // 1, 3, 1, 0, 1
                      title: "steel_ingot",
                      path: "C:textures/digital_miner/items/ore/steel/steel_ingot",
                      buttons: [
                        { directory: [1, 3, 1, 0, 2] } // Steel Nugget
                      ]
                    },
                    { // 1, 3, 1, 0, 2
                      title: "steel_nugget",
                      path: "C:textures/digital_miner/items/ore/steel/steel_nugget",
                      buttons: [
                        { directory: [1, 3, 0, 2] } // Steel Dust
                      ]
                    },
                    { directory: [1, 3, 0, 2] } // Steel Dust
                  ]
                },
                { // 1, 3, 1, 1
                  title: "gold_plate",
                  path: "C:textures/digital_miner/items/ore/gold/gold_plate"
                },
                { // 1, 3, 1, 2
                  title: "diamond_plate",
                  path: "C:textures/digital_miner/items/ore/diamond/diamond_plate",
                  buttons: [
                    { directory: [1, 3, 1, 1] }, // Gold Plate
                    { directory: [1, 3, 0, 4] } // Diamond Dust
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    { // 2
      title: "change_log",
      path: "change_log",
      buttons: [
        {
          title: "version_1.0",
          path: "C:textures/digital_miner/ui/guidebook/main/change_log"
        },
        {
          title: "version_0.4",
          path: "C:textures/digital_miner/ui/guidebook/main/change_log"
        },
        {
          title: "version_0.3",
          path: "C:textures/digital_miner/ui/guidebook/main/change_log"
        },
        {
          title: "version_0.2",
          path: "C:textures/digital_miner/ui/guidebook/main/change_log"
        },
        {
          title: "version_0.1",
          path: "C:textures/digital_miner/ui/guidebook/main/change_log"
        }
      ]
    }
  ]
}



export interface GuidebookPages extends Buttons {
  // type?: "action" | "modal"
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