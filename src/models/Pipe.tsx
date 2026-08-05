export default function Pipe({ position, length = 2, }: {
    position: [number, number, number];
    length?: number;
}) {
    return (
        <mesh
            position={position}
            rotation={[0, 0, Math.PI / 2]}
        >
            <cylinderGeometry args={[0.08, 0.08, length, 16]} />
            <meshStandardMaterial color="#6B7280" />
        </mesh>
    );
}