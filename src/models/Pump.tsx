interface PumpProps {
    onSelect: () => void;
    onHover: (hover: boolean) => void;
}

export default function Pump({ onSelect, onHover, }: PumpProps) {
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
            <meshStandardMaterial color="#9CA3AF" />
        </mesh>
    );
}