import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
    EffectComposer,
    Outline,
    Selection,
    Select,
} from "@react-three/postprocessing";
import { useState } from "react";

import Tank from "../models/Tank";
import Pump from "../models/Pump";
import Filter from "../models/Filter";
import ReuseTank from "../models/ReuseTank";
import Pipe from "../models/Pipe";

import type { Equipment } from "../types/Equipment";
import { EQUIPMENT } from "../data/equipment";

import type { EquipmentStatusMap } from "../types/EquipmentStatus";

interface TwinSceneProps {
    selectedEquipment: Equipment | null;
    equipmentStatus: EquipmentStatusMap;
    onSelectEquipment: (equipment: Equipment | null) => void;
}

export default function TwinScene({
    selectedEquipment,
    equipmentStatus,
    onSelectEquipment,
}: TwinSceneProps) {
    const [hoveredEquipment, setHoveredEquipment] =
    useState<Equipment | null>(null);

    const handleHover = (
        equipment: Equipment,
        hover: boolean
    ) => { setHoveredEquipment(hover ? equipment : null); };

    return (
        <Canvas
            camera={{ position: [0, 6, 12], fov: 50 }}
            style={{ width: "100%", height: "500px" }}
            onPointerMissed={() => onSelectEquipment(null)}
        >
            <Selection>
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

                <Select enabled={
                    selectedEquipment?.id === "tank" ||
                    hoveredEquipment?.id === "tank"
                }>
                    <Tank
                        state={equipmentStatus.tank.status}
                        onSelect={() => onSelectEquipment(EQUIPMENT.tank)}
                        onHover={(hover) => handleHover(EQUIPMENT.tank, hover)}
                    />
                </Select>

                <Pipe position={[-3.5, 1, 0]} />

                <Select enabled={
                    selectedEquipment?.id === "pump" ||
                    hoveredEquipment?.id === "pump"
                }>
                    <Pump
                        state={equipmentStatus.pump.status}
                        onSelect={() => onSelectEquipment(EQUIPMENT.pump)}
                        onHover={(hover) => handleHover(EQUIPMENT.pump, hover)}
                    />
                </Select>

                <Pipe position={[-0.5, 1, 0]} />

                <Select enabled={
                    selectedEquipment?.id === "filter" ||
                    hoveredEquipment?.id === "filter"
                }>
                    <Filter
                        state={equipmentStatus.filter.status}
                        onSelect={() => onSelectEquipment(EQUIPMENT.filter)}
                        onHover={(hover) => handleHover(EQUIPMENT.filter, hover)}
                    />
                </Select>

                <Pipe position={[2, 1, 0]} />

                <Select enabled={
                    selectedEquipment?.id === "reuseTank" ||
                    hoveredEquipment?.id === "reuseTank"
                }>
                    <ReuseTank
                        state={equipmentStatus.reuseTank.status}
                        onSelect={() => onSelectEquipment(EQUIPMENT.reuseTank)}
                        onHover={(hover) => handleHover(EQUIPMENT.reuseTank, hover)}
                    />
                </Select>

                <EffectComposer autoClear={false}>
                    <Outline
                        visibleEdgeColor={0xffffff}
                        hiddenEdgeColor={0xffffff}
                        edgeStrength={8}
                        blur
                        xRay={false}
                    />
                </EffectComposer>
            </Selection>

            <OrbitControls />
        </Canvas>
    );
}