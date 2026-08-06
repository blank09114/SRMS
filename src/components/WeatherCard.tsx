import type { WeatherResponse } from "../types/WeatherResponse";

interface WeatherCardProps {
    weatherData: WeatherResponse | null;
    loading: boolean;
    error: string | null;
}

export default function WeatherCard({
    weatherData,
    loading,
    error,
}: WeatherCardProps) {
    const isDemoData = weatherData?.sensors.some(sensor => sensor.source === "DEMO") ?? false;

    return (
        <div className="card weather flex">
            <h2 className="cardTitle">기상 정보</h2>

            {loading ? (
                <p className="cardText">기상 정보를 불러오는 중...</p>
            ) : error ? (
                <p className="cardText">{error}</p>
            ) : (
                <>
                    <p className="cardText">
                        기온: {weatherData?.weather.temperature}℃ <br />
                        습도: {weatherData?.weather.humidity}% <br />
                        강수 확률: {weatherData?.weather.rainfallProbability}% <br />
                        강수량: {weatherData?.weather.rainfall}mm
                    </p>

                    <p className="cardText">
                        데이터 출처: {isDemoData ? "시연용 더미 데이터" : "기상청 단기예보 조회 서비스"} <br />
                        마지막 조회:
                        {" "}
                        {weatherData?.fetchedAt.toLocaleString("ko-KR")}
                    </p>
                </>
            )}
        </div>
    );
}
