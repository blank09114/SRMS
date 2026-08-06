import { mapWeatherToSensorData } from "../services/sensorMapper";

import type { WeatherData } from "../types/WeatherData";
import type { WeatherResponse } from "../types/WeatherResponse";

const MIXED_DEMO_WEATHER: WeatherData = {
    temperature: 36,
    humidity: 80,
    rainfallProbability: 75,
    rainfall: 2,
};

export function createMixedDemoWeather(): WeatherResponse {
    const createdAt = new Date();
    const sensors = mapWeatherToSensorData(MIXED_DEMO_WEATHER).map(sensor => ({
        ...sensor,
        timestamp: createdAt.toISOString(),
        status: sensor.sensorType === "rainfall"
            ? "normal" as const
            : "warning" as const,
        isAnomaly: sensor.sensorType !== "rainfall",
        source: "DEMO",
    }));

    return {
        weather: MIXED_DEMO_WEATHER,
        sensors,
        rawData: [],
        fetchedAt: createdAt,
    };
}
