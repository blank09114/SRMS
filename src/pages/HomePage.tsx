import { useEffect, useState } from "react";
import { getWeather } from "../api/weatherApi";
import type { WeatherResponse } from "../types/WeatherResponse";

function HomePage() {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showSensorData, setShowSensorData] = useState(false);
    const [showRawData, setShowRawData] = useState(false);

    useEffect(() => {
        async function loadWeather() {
            try {
                setLoading(true);

                const data = await getWeather();

                setWeatherData(data);
                setError(null);
            } catch (error) {
                console.error(error);
                setError("기상청 데이터를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        }

        loadWeather();
    }, []);

    if (loading) return <div>날씨 데이터를 불러오는 중...</div>;
    if (error) return <div>{error}</div>;
    if (!weatherData) return <div>데이터가 없습니다.</div>;

    return (
        <div>
            <h1>SRMS</h1>

            <h2>기상청 데이터</h2>

            <p>기온 : {weatherData.weather.temperature}℃</p>
            <p>습도 : {weatherData.weather.humidity}%</p>
            <p>강수확률 : {weatherData.weather.rainfallProbability}%</p>
            <p>강수량 : {weatherData.weather.rainfall}mm</p>

            <br />

            <p>데이터 출처 : 기상청 단기예보 조회서비스</p>

            <p>
                마지막 조회 :
                {" "}
                {weatherData.fetchedAt.toLocaleString()}
            </p>

            <hr />

            <button
                onClick={() => setShowSensorData(!showSensorData)}
            >
                {showSensorData
                    ? "SensorData 숨기기"
                    : "SensorData 보기"}
            </button>

            {
                showSensorData && (
                    <pre>
                        {JSON.stringify(weatherData.sensors, null, 2)}
                    </pre>
                )
            }

            <br />
            <br />

            <button
                onClick={() => setShowRawData(!showRawData)}
            >
                {showRawData
                    ? "원본 데이터 숨기기"
                    : "원본 데이터 보기"}
            </button>

            {
                showRawData && (
                    <pre>
                        {JSON.stringify(weatherData.rawData, null, 2)}
                    </pre>
                )
            }
        </div>
    );
}

export default HomePage;