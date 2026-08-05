export function getEquipmentStatus() {
    return {
        tank: {
            status: "normal",
            sensors: {
                waterLevel: 58,
            },
        },

        pump: {
            status: "normal",
            sensors: {
                flowRate: 18,
            },
        },

        filter: {
            status: "warning",
            sensors: {
                filterLoad: 78,
            },
        },

        reuseTank: {
            status: "normal",
            sensors: {
                quality: 94,
            },
        },
    } as const;
}