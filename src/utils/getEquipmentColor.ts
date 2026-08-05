import type { EquipmentState } from "../types/EquipmentStatus";

// 설비 상태에 따른 3D 모델 색상 반환
export function getEquipmentColor(state: EquipmentState) {
    switch (state) {
        case "warning":
            return "rgb(245,158,11)";

        case "danger":
            return "rgb(220,38,38)";

        default:
            return "#9CA3AF";
    }
}