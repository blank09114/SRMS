import type { EquipmentState } from "../types/EquipmentStatus";

export function getStatusText(state: EquipmentState): string {
    switch (state) {
        case "normal":
            return "정상";
        case "warning":
            return "주의";
        case "danger":
            return "위험";
    }
}