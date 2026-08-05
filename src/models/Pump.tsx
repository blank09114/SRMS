import type { EquipmentState } from "../types/EquipmentStatus";
import { getEquipmentColor } from "../utils/getEquipmentColor";

interface PumpProps {
    onSelect: () => void;
    onHover: (hover: boolean) => void;
    state: EquipmentState;
}

export default function Pump({ onSelect, onHover, state, }: PumpProps) {
    // 설비 상태에 따라 모델 색상 결정
    const color = getEquipmentColor(state);

    return (
        <mesh
            position={[-2, 1, 0]}
            rotation={[0, 0, Math.PI / 2]}
            onPointerOver={() => onHover(true)}
            onPointerOut={() => onHover(false)}
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
            }}
        >
            <cylinderGeometry args={[0.6, 0.6, 2.2, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}