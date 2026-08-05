import type { EquipmentState } from "../types/EquipmentStatus";
import { getEquipmentColor } from "../utils/getEquipmentColor";

interface ReuseTankProps {
    onSelect: () => void;
    onHover: (hover: boolean) => void;
    state: EquipmentState;
}

export default function ReuseTank({ onSelect, onHover, state, }: ReuseTankProps) {
    const color = getEquipmentColor(state);

    return (
        <mesh
            position={[4.5, 1.2, 0]}
            onPointerOver={() => onHover(true)}
            onPointerOut={() => onHover(false)}
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
            }}
        >
            <boxGeometry args={[3.5, 3, 2.8]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}