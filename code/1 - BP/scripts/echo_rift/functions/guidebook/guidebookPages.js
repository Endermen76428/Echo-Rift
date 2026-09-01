const addonId = "digital_miner";
export const guidebookInfo = {
    title: "main",
    buttons: [
        {
            title: "how_work",
            path: "works",
            buttons: [
                {
                    title: "digital_miner",
                    path: "C:textures/digital_miner/ui/guidebook/main/crafts/digital_miner",
                    buttons: [
                        { directory: [1, 0, 0] },
                        {
                            title: "filter",
                            path: "C:textures/digital_miner/ui/filter",
                            buttons: [
                                { title: "type", path: false },
                                { title: "tag", path: false },
                                { title: "remove", path: false }
                            ]
                        },
                        {
                            title: "upgrades",
                            path: "C:textures/digital_miner/ui/upgrades",
                            buttons: [
                                {
                                    title: "speed",
                                    path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_2",
                                    buttons: [
                                        { directory: [1, 1, 1] }
                                    ]
                                },
                                {
                                    title: "stack",
                                    path: "C:textures/digital_miner/items/machines/upgrades/stack/stack_2",
                                    buttons: [
                                        { directory: [1, 1, 2] }
                                    ]
                                },
                                {
                                    title: "fortune",
                                    path: "C:textures/digital_miner/items/machines/upgrades/fortune/fortune_2",
                                    buttons: [
                                        { directory: [1, 1, 3] }
                                    ]
                                },
                                {
                                    title: "silk_touch",
                                    path: "C:textures/digital_miner/items/machines/upgrades/silk_touch/silk_touch_2",
                                    buttons: [
                                        { directory: [1, 1, 4] }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "settings",
                            path: "C:textures/digital_miner/ui/settings"
                        }
                    ]
                },
                {
                    title: "ore_scanner",
                    path: "C:textures/digital_miner/items/tools/ore_scanner"
                }
            ]
        },
        {
            title: "craft",
            path: "crafts",
            buttons: [
                {
                    title: "machines",
                    path: "C:textures/digital_miner/ui/guidebook/main/crafts/digital_miner",
                    buttons: [
                        {
                            title: "digital_miner",
                            path: "C:textures/digital_miner/ui/guidebook/main/crafts/digital_miner",
                            buttons: [
                                {
                                    title: "resource_amount",
                                    path: "C:textures/items/raw_iron"
                                },
                                { directory: [1, 3, 1, 0] },
                                {
                                    title: "monitor",
                                    path: "C:textures/digital_miner/items/machines/digital_miner/monitor/monitor",
                                    buttons: [
                                        { directory: [1, 3, 1, 0, 1] },
                                        {
                                            title: "integrated_circuit",
                                            path: "C:textures/digital_miner/items/machines/digital_miner/monitor/integrated_circuit",
                                            buttons: [
                                                {
                                                    title: "capacitor",
                                                    path: "C:textures/digital_miner/items/machines/digital_miner/monitor/capacitor",
                                                    buttons: [
                                                        { directory: [1, 3, 1, 0, 2] }
                                                    ]
                                                },
                                                { directory: [1, 3, 1, 0, 2] }
                                            ]
                                        },
                                        {
                                            title: "diamond_glass",
                                            path: "C:textures/digital_miner/blocks/glass/diamond_glass",
                                            buttons: [
                                                { directory: [1, 3, 0, 4] }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    title: "digital_processor",
                                    path: "C:textures/digital_miner/items/machines/digital_miner/digital_processor/digital_processor",
                                    buttons: [
                                        {
                                            title: "advanced_circuit",
                                            path: "C:textures/digital_miner/items/machines/digital_miner/digital_processor/advanced_circuit",
                                            buttons: [
                                                { directory: [1, 0, 0, 2, 1] },
                                                {
                                                    title: "redstone_enriched_quartz",
                                                    path: "C:textures/digital_miner/items/ore/redstone_enriched_quartz"
                                                },
                                                { directory: [1, 3, 1, 2] }
                                            ]
                                        },
                                        { directory: [1, 3, 1, 0] },
                                        { directory: [1, 3, 1, 1] },
                                        { directory: [1, 3, 1, 2] }
                                    ]
                                },
                                {
                                    title: "machine_engine",
                                    path: "C:textures/digital_miner/items/machines/digital_miner/machine_engine/machine_engine",
                                    buttons: [
                                        { directory: [1, 3, 1, 0, 0] }
                                    ]
                                },
                                {
                                    title: "laser_drill",
                                    path: "C:textures/digital_miner/items/machines/digital_miner/laser_drill/laser_drill",
                                    buttons: [
                                        { directory: [1, 3, 1, 0] },
                                        { directory: [1, 3, 1, 0, 1] },
                                        {
                                            title: "light_generator",
                                            path: "C:textures/digital_miner/ui/guidebook/main/crafts/light_generator",
                                            buttons: [
                                                { directory: [1, 3, 1, 0, 0] }
                                            ]
                                        },
                                        { directory: [1, 0, 0, 3, 0, 1] },
                                        { directory: [1, 0, 0, 2, 2] }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "ore_scanner",
                            path: "C:textures/digital_miner/items/tools/ore_scanner",
                            buttons: [
                                { directory: [1, 3, 1, 0, 0] }
                            ]
                        }
                    ]
                },
                {
                    title: "upgrades",
                    path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_2",
                    buttons: [
                        {
                            title: "template",
                            path: "C:textures/digital_miner/items/machines/upgrades/template",
                            buttons: [
                                { directory: [1, 3, 0, 0] },
                                { directory: [1, 3, 1, 0, 1] },
                                { directory: [1, 3, 1, 0] },
                                { directory: [1, 3, 1, 1] },
                                { directory: [1, 3, 1, 2] },
                                { directory: [1, 0, 0, 2, 1] },
                            ]
                        },
                        {
                            title: "speed",
                            path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_4",
                            buttons: [
                                {
                                    title: "speed_1",
                                    path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_1",
                                    buttons: [
                                        { directory: [1, 1, 0] },
                                        { directory: [1, 3, 1, 0, 0] },
                                        { directory: [1, 3, 1, 0, 1] }
                                    ]
                                },
                                {
                                    title: "speed_2",
                                    path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_2",
                                    buttons: [
                                        { directory: [1, 1, 1, 0] },
                                        { directory: [1, 3, 1, 0, 0] }
                                    ]
                                },
                                {
                                    title: "speed_3",
                                    path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_3",
                                    buttons: [
                                        { directory: [1, 1, 1, 1] },
                                        { directory: [1, 3, 1, 0] },
                                        { directory: [1, 3, 1, 0, 0] }
                                    ]
                                },
                                {
                                    title: "speed_4",
                                    path: "C:textures/digital_miner/items/machines/upgrades/speed/speed_4",
                                    buttons: [
                                        { directory: [1, 1, 1, 2] },
                                        { directory: [1, 3, 1, 0] }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "stack",
                            path: "C:textures/digital_miner/items/machines/upgrades/stack/stack_4",
                            buttons: [
                                {
                                    title: "stack_1",
                                    path: "C:textures/digital_miner/items/machines/upgrades/stack/stack_1",
                                    buttons: [
                                        { directory: [1, 1, 0] },
                                        { directory: [1, 3, 1, 0, 0] },
                                        { directory: [1, 3, 1, 0, 1] }
                                    ]
                                },
                                {
                                    title: "stack_2",
                                    path: "C:textures/digital_miner/items/machines/upgrades/stack/stack_2",
                                    buttons: [
                                        { directory: [1, 1, 2, 0] },
                                        { directory: [1, 3, 1, 0, 0] }
                                    ]
                                },
                                {
                                    title: "stack_3",
                                    path: "C:textures/digital_miner/items/machines/upgrades/stack/stack_3",
                                    buttons: [
                                        { directory: [1, 1, 2, 1] },
                                        { directory: [1, 3, 1, 0] },
                                        { directory: [1, 3, 1, 0, 0] }
                                    ]
                                },
                                {
                                    title: "stack_4",
                                    path: "C:textures/digital_miner/items/machines/upgrades/stack/stack_4",
                                    buttons: [
                                        { directory: [1, 1, 2, 2] },
                                        { directory: [1, 3, 1, 0] }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "fortune",
                            path: "C:textures/digital_miner/items/machines/upgrades/fortune/fortune_4",
                            buttons: [
                                {
                                    title: "fortune_1",
                                    path: "C:textures/digital_miner/items/machines/upgrades/fortune/fortune_2",
                                    buttons: [
                                        { directory: [1, 1, 0] },
                                        { directory: [1, 3, 1, 0, 0] }
                                    ]
                                },
                                {
                                    title: "fortune_2",
                                    path: "C:textures/digital_miner/items/machines/upgrades/fortune/fortune_3",
                                    buttons: [
                                        { directory: [1, 1, 3, 0] },
                                        { directory: [1, 3, 1, 0] },
                                        { directory: [1, 3, 1, 0, 0] }
                                    ]
                                },
                                {
                                    title: "fortune_3",
                                    path: "C:textures/digital_miner/items/machines/upgrades/fortune/fortune_4",
                                    buttons: [
                                        { directory: [1, 1, 3, 1] },
                                        { directory: [1, 3, 1, 0] }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "silk_touch",
                            path: "C:textures/digital_miner/items/machines/upgrades/silk_touch/silk_touch_1",
                            buttons: [
                                { directory: [1, 1, 0] },
                                { directory: [1, 3, 1, 0, 0] }
                            ]
                        }
                    ]
                },
                {
                    title: "tools",
                    path: "C:textures/digital_miner/items/tools/hammer",
                    buttons: [
                        {
                            title: "hammer",
                            path: "C:textures/digital_miner/items/tools/hammer"
                        }
                    ]
                },
                {
                    title: "ore",
                    path: "C:textures/items/diamond",
                    buttons: [
                        {
                            title: "dust",
                            path: "C:textures/digital_miner/items/ore/steel/steel_dust",
                            buttons: [
                                {
                                    title: "coal",
                                    path: "C:textures/digital_miner/items/ore/coal_dust",
                                    buttons: [
                                        { directory: [1, 2, 0] }
                                    ]
                                },
                                {
                                    title: "iron",
                                    path: "C:textures/digital_miner/items/ore/iron_dust",
                                    buttons: [
                                        { directory: [1, 2, 0] }
                                    ]
                                },
                                {
                                    title: "steel",
                                    path: "C:textures/digital_miner/items/ore/steel/steel_dust",
                                    buttons: [
                                        { directory: [1, 2, 0] },
                                        { directory: [1, 3, 0, 0] },
                                        { directory: [1, 3, 0, 1] }
                                    ]
                                },
                                {
                                    title: "gold",
                                    path: "C:textures/digital_miner/items/ore/gold/gold_dust",
                                    buttons: [
                                        { directory: [1, 2, 0] }
                                    ]
                                },
                                {
                                    title: "diamond",
                                    path: "C:textures/digital_miner/items/ore/diamond/diamond_dust",
                                    buttons: [
                                        { directory: [1, 2, 0] }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "plate",
                            path: "C:textures/digital_miner/items/ore/steel/steel_plate",
                            buttons: [
                                {
                                    title: "steel_plate",
                                    path: "C:textures/digital_miner/items/ore/steel/steel_plate",
                                    buttons: [
                                        {
                                            title: "steel_block",
                                            path: "C:textures/digital_miner/blocks/ore/steel/steel_block",
                                            buttons: [
                                                { directory: [1, 3, 1, 0, 1] }
                                            ]
                                        },
                                        {
                                            title: "steel_ingot",
                                            path: "C:textures/digital_miner/items/ore/steel/steel_ingot",
                                            buttons: [
                                                { directory: [1, 3, 1, 0, 2] }
                                            ]
                                        },
                                        {
                                            title: "steel_nugget",
                                            path: "C:textures/digital_miner/items/ore/steel/steel_nugget",
                                            buttons: [
                                                { directory: [1, 3, 0, 2] }
                                            ]
                                        },
                                        { directory: [1, 3, 0, 2] }
                                    ]
                                },
                                {
                                    title: "gold_plate",
                                    path: "C:textures/digital_miner/items/ore/gold/gold_plate"
                                },
                                {
                                    title: "diamond_plate",
                                    path: "C:textures/digital_miner/items/ore/diamond/diamond_plate",
                                    buttons: [
                                        { directory: [1, 3, 1, 1] },
                                        { directory: [1, 3, 0, 4] }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
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
};
