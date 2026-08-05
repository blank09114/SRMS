import type { WeatherData } from "./WeatherData";
import type { SensorData } from "./SensorData";

export interface WeatherResponse {
    weather: WeatherData;
    sensors: SensorData[];

    rawData: unknown[];
    fetchedAt: Date;
}