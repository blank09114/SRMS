interface FilterProps {
    onSelect: () => void;
    onHover: (hover: boolean) => void;
}

export default function Filter({ onSelect, onHover, }: FilterProps) {
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
            <meshStandardMaterial color="#9CA3AF" />
        </mesh>
    );
}