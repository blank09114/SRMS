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

        // 울산 남구(테스트용)
        nx: "102",
        ny: "84",
    });

    const response = await fetch(`${BASE_URL}?${params}`);

    if (!response.ok) {
        throw new Error("기상청 API 호출 실패");
    }

    const data = await response.json();

    console.log(data.response.body.items.item);

    return data;
}