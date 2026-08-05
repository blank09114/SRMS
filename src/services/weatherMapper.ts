import type { WeatherData } from "../types/WeatherData";

interface WeatherItem {
    category: string;
    fcstValue: string;
}

export function mapWeatherData(items: WeatherItem[]): WeatherData {
    const getValue = (category: string): string => {
        return items.find(item => item.category === category)?.fcstValue ?? "";
    };

    const rainfall = getValue("PCP");

    return {
        temperature: Number(getValue("TMP")),
        humidity: Number(getValue("REH")),
        rainfallProbability: Number(getValue("POP")),
        rainfall:
            rainfall === "강수없음"
                ? 0
                : Number(rainfall.replace("mm", "").trim()),
    };
}