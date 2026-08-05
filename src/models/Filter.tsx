import type { EquipmentState } from "../types/EquipmentStatus";
import { getEquipmentColor } from "../utils/getEquipmentColor";

interface FilterProps {
    onSelect: () => void;
    onHover: (hover: boolean) => void;
    state: EquipmentState;
}

export default function Filter({ onSelect, onHover, state, }: FilterProps) {
    // 설비 상태에 따라 모델 색상 결정
    const color = getEquipmentColor(state);

    return (
        <mesh
            position={[1, 1, 0]}
            onPointerOver={() => onHover(true)}
            onPointerOut={() => onHover(false)}
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
            }}
        >
            <cylinderGeometry args={[0.5, 0.5, 2.5, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}