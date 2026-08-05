import type { ThreeElements } from "@react-three/fiber";

export default function Pump() {
    return (
        <mesh position={[-2, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.6, 0.6, 2.2, 32]} />
            <meshStandardMaterial color="#9CA3AF" />
        </mesh>
    );
}