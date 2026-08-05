import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Tank from "../models/Tank";
import Pump from "../models/Pump";
import Filter from "../models/Filter";
import ReuseTank from "../models/ReuseTank";
import Pipe from "../models/Pipe";

export default function TwinScene() {
    return (
        <Canvas
            camera={{ position: [0, 6, 12], fov: 50 }}
            style={{ width: "100%", height: "500px" }}
        >
            <ambientLight intensity={2} />
            <directionalLight position={[5, 10, 5]} />

            {/* 바닥 */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.1, 0]}
            >
                <planeGeometry args={[20, 10]} />
                <meshStandardMaterial color="#D1D5DB" />
            </mesh>

            <Tank />
            <Pipe position={[-3.5, 1, 0]} />
            <Pump />
            <Pipe position={[-0.5, 1, 0]} />
            <Filter />
            <Pipe position={[2, 1, 0]} />
            <ReuseTank />

            <OrbitControls />
        </Canvas>
    );
}