import type { ThreeElements } from "@react-three/fiber";

export default function Tank() {
    return (
        <mesh position={[-5, 1, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#9CA3AF" />
        </mesh>
    );
}