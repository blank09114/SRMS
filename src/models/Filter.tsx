import type { ThreeElements } from "@react-three/fiber";

export default function Filter() {
    return (
        <mesh position={[1, 1.4, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
            <meshStandardMaterial color="#9CA3AF" />
        </mesh>
    );
}