import { mapWeatherData } from "../services/weatherMapper";
import type { WeatherResponse } from "../types/WeatherResponse";

const BASE_URL =
    "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

const SERVICE_KEY = import.meta.env.VITE_KMA_SERVICE_KEY;

export async function getWeather(): Promise<WeatherResponse> {
    const params = new URLSearchParams({
        serviceKey: SERVICE_KEY,
        pageNo: "1",
        numOfRows: "100",
        dataType: "JSON",

        base_date: "20260805",
        base_time: "0500",

        nx: "102",
        ny: "84",
    });

    const response = await fetch(`${BASE_URL}?${params}`);

    if (!response.ok) { throw new Error("API 호출 실패"); }

    const data = await response.json();

    if (data.response.header.resultCode !== "00") { throw new Error(data.response.header.resultMsg); }

    const items = data.response.body.items.item;
    const forecastTime = items[0].fcstTime;
    const forecastItems = items.filter((item: any) => item.fcstTime === forecastTime);

    return {
        weather: mapWeatherData(forecastItems),
        rawData: items,
        fetchedAt: new Date(),
    };
}