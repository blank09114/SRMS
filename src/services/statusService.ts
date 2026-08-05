import type { SensorData } from "../types/SensorData";
import type { EquipmentStatusMap, EquipmentState, } from "../types/EquipmentStatus";

function getTankState(level: number): EquipmentState {
    if (level >= 90) return "danger";
    if (level >= 70) return "warning";
    return "normal";
}

function getPumpState(flow: number): EquipmentState {
    if (flow >= 35) return "danger";
    if (flow >= 20) return "warning";
    return "normal";
}

function getFilterState(load: number): EquipmentState {
    if (load >= 90) return "danger";
    if (load >= 70) return "warning";
    return "normal";
}

function getReuseTankState(quality: number): EquipmentState {
    if (quality <= 50) return "danger";
    if (quality <= 70) return "warning";
    return "normal";
}

export function getEquipmentStatus( sensors: SensorData[], ): EquipmentStatusMap {
    const rainfall =
        sensors.find(sensor => sensor.sensorType === "rainfall")?.value ?? 0;
    const humidity =
        sensors.find(sensor => sensor.sensorType === "humidity")?.value ?? 0;
    const temperature =
        sensors.find(sensor => sensor.sensorType === "temperature")?.value ?? 0;
    const rainfallProbability =
        sensors.find(sensor => sensor.sensorType === "rainfallProbability")?.value ?? 0;

    // 기상 데이터를 설비 센서값으로 변환
    const waterLevel = Math.min(
        100,
        humidity * 0.3 +
        rainfallProbability * 0.7 +
        rainfall * 10,
    );
    const flowRate = Math.min(
        40,
        rainfallProbability * 0.25 +
        rainfall * 5,
    );
    const filterLoad = Math.min(
        100,
        humidity * 0.2 +
        rainfallProbability * 0.6 +
        rainfall * 8,
    );
    const quality = Math.max(
        0,
        100 -
        rainfallProbability * 0.35 -
        rainfall * 5 +
        temperature * 0.3,
    );

    return {
        tank: {
            status: getTankState(waterLevel),
            sensors: {
                waterLevel,
            },
        },
        pump: {
            status: getPumpState(flowRate),
            sensors: {
                flowRate,
            },
        },
        filter: {
            status: getFilterState(filterLoad),
            sensors: {
                filterLoad,
            },
        },
        reuseTank: {
            status: getReuseTankState(quality),
            sensors: {
                quality,
            },
        },
    };
}