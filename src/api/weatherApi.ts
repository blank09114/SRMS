import { mapWeatherData } from "../services/weatherMapper";

const BASE_URL =
    "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

const SERVICE_KEY = import.meta.env.VITE_KMA_SERVICE_KEY;

export async function getWeather() {

    const params = new URLSearchParams({
        serviceKey: SERVICE_KEY,
        pageNo: "1",
        numOfRows: "100",
        dataType: "JSON",

        // 테스트용
        base_date: "20260805",
        base_time: "0500",

        // 울산
        nx: "102",
        ny: "84",
    });

    const response = await fetch(`${BASE_URL}?${params}`);

    if (!response.ok) {
        throw new Error("기상청 API 호출 실패");
    }

    const data = await response.json();

    const items = data.response.body.items.item;

    // 가장 가까운 예보 시간 하나 선택
    const forecastTime = items[0].fcstTime;

    const forecastItems = items.filter(
        (item: any) => item.fcstTime === forecastTime
    );

    return mapWeatherData(forecastItems);
}