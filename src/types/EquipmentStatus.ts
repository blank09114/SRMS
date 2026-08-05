export type EquipmentState = "normal" | "warning" | "danger";

export interface EquipmentStatus {
    status: EquipmentState;

    sensors: {
        waterLevel?: number;
        flowRate?: number;
        filterLoad?: number;
        quality?: number;
    };
}