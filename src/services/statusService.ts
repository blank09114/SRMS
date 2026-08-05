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
    // 기상 데이터를 기반으로 설비 센서값 생성
    const rainfall =
        sensors.find(sensor => sensor.sensorType === "rainfall")?.value ?? 0;
    const humidity =
        sensors.find(sensor => sensor.sensorType === "humidity")?.value ?? 0;
    const temperature =
        sensors.find(sensor => sensor.sensorType === "temperature")?.value ?? 0;
    const rainfallProbability =
        sensors.find(sensor => sensor.sensorType === "rainfallProbability")?.value ?? 0;

    // 강수 확률, 강수량, 습도를 이용해 저장 탱크 수위 계산
    const waterLevel = Math.min(
        100,
        humidity * 0.3 +
        rainfallProbability * 0.7 +
        rainfall * 10,
    );
    // 강수량을 기반으로 펌프 유량 계산
    const flowRate = Math.min(
        40,
        rainfallProbability * 0.25 +
        rainfall * 5,
    );
    // 습도와 강수량을 이용해 필터 부하 계산
    const filterLoad = Math.min(
        100,
        humidity * 0.2 +
        rainfallProbability * 0.6 +
        rainfall * 8,
    );
    // 강수량 증가 시 수질 저하를 가정해 재사용탱크 수질 게산
    const quality = Math.max(
        0,
        100 -
        rainfallProbability * 0.35 -
        rainfall * 5 +
        temperature * 0.3,
    );

    // 계산관 센서값을 기반으로 설비 상태 정보 생성
    return {
        tank: {
            status: getTankState(waterLevel),
            sensors: { waterLevel, },
        },
        pump: {
            status: getPumpState(flowRate),
            sensors: { flowRate, },
        },
        filter: {
            status: getFilterState(filterLoad),
            sensors: { filterLoad, },
        },
        reuseTank: {
            status: getReuseTankState(quality),
            sensors: { quality, },
        },
    };
}