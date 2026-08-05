import type { EquipmentState } from "../types/EquipmentStatus";
import { getEquipmentColor } from "../utils/getEquipmentColor";

interface TankProps {
    onSelect: () => void;
    onHover: (hover: boolean) => void;
    state: EquipmentState;
}

export default function Tank({ onSelect, onHover, state, }: TankProps) {
    const color = getEquipmentColor(state);

    return (
        <mesh
            position={[-5, 1, 0]}
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
            }}
            onPointerOver={() => onHover(true)}
            onPointerOut={() => onHover(false)}
        >
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}