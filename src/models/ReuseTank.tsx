import type { ThreeElements } from "@react-three/fiber";

export default function ReuseTank() {
    return (
        <mesh position={[4.5, 1.2, 0]}>
            <boxGeometry args={[3.5, 3, 2.8]} />
            <meshStandardMaterial color="#9CA3AF" />
        </mesh>
    );
}