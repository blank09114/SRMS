interface TankProps {
    onSelect: () => void;
    onHover: (hover: boolean) => void;
}

export default function Tank({ onSelect, onHover, }: TankProps) {
    return (
        <mesh
            position={[-5, 1, 0]}
            onPointerOver={() => onHover(true)}
            onPointerOut={() => onHover(false)}
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
            }}
        >
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#9CA3AF" />
        </mesh>
    );
}