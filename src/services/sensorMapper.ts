import type { WeatherData } from "../types/WeatherData";
import type { SensorData } from "../types/SensorData";

interface SensorDefinition {
    key: keyof WeatherData;
    sensorId: string;
    sensorName: string;
    sensorType: string;
    unit: string;
}

const SENSOR_DEFINITIONS: readonly SensorDefinition[] = [
    {
        key: "temperature",
        sensorId: "TEMP-001",
        sensorName: "온도 센서",
        sensorType: "temperature",
        unit: "℃",
    },
    {
        key: "humidity",
        sensorId: "HUM-001",
        sensorName: "습도 센서",
        sensorType: "humidity",
        unit: "%",
    },
    {
        key: "rainfallProbability",
        sensorId: "POP-001",
        sensorName: "강수확률 센서",
        sensorType: "rainfallProbability",
        unit: "%",
    },
    {
        key: "rainfall",
        sensorId: "RAIN-001",
        sensorName: "강수량 센서",
        sensorType: "rainfall",
        unit: "mm",
    },
] as const;

export function mapWeatherToSensorData(weather: WeatherData): SensorData[] {
    return SENSOR_DEFINITIONS.map(sensor => ({
        timestamp: new Date().toISOString(),

        sensorId: sensor.sensorId,
        sensorName: sensor.sensorName,
        sensorType: sensor.sensorType,

        value: weather[sensor.key],
        unit: sensor.unit,

        location: "미지정",

        status: "normal",
        isAnomaly: false,

        source: "KMA",
    }));
}