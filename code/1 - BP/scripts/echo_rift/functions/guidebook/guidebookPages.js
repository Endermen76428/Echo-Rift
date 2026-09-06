export const guidebookInfo = {
    title: "main",
    buttons: [
        {
            title: "general",
            path: "info",
            buttons: [
                { directory: [1] }
            ]
        },
        {
            title: "raids_list",
            path: "C:textures/echo_rift/entity/rift/forgotten_kingdom",
            body: false,
            buttons: [
                {
                    title: "forgotten_kingdom",
                    path: "C:textures/echo_rift/items/memory/forgotten_kingdom",
                    buttons: [
                        {
                            title: "marble_cave",
                            path: "C:textures/echo_rift/blocks/dimension/forgotten_kingdom/decoration/marble"
                        },
                        {
                            title: "memory",
                            path: "C:textures/echo_rift/items/memory/forgotten_kingdom",
                            buttons: [
                                { directory: [1, 0, 0] }
                            ]
                        },
                        {
                            title: "rift",
                            path: "C:textures/echo_rift/entity/rift/forgotten_kingdom",
                            buttons: [
                                { directory: [1, 0, 0] }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
