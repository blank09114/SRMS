export type SensorStatus = "normal" | "warning" | "danger";

export interface SensorData {
    timestamp: string;

    sensorId: string;
    sensorName: string;
    sensorType: string;

    value: number;
    unit: string;

    location: string;

    status: SensorStatus;
    isAnomaly: boolean;

    source: string;
}