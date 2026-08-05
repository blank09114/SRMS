import type { WeatherData } from "./WeatherData";

export interface WeatherResponse {
    weather: WeatherData;
    rawData: unknown[];
    fetchedAt: Date;
}