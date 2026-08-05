import { useEffect, useState } from "react";

import TwinScene from "../components/TwinScene";
import WeatherCard from "../components/WeatherCard";

import { getWeather } from "../api/weatherApi";
import type { WeatherResponse } from "../types/WeatherResponse";

function HomePage() {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadWeather() {
            try {
                setLoading(true);
                setError(null);

                const data = await getWeather();
                setWeatherData(data);
            } catch (error) {
                console.error(error);
                setError("기상 정보를 불러오지 못했습니다.");
            } finally { setLoading(false); }
        }

        loadWeather();
    }, []);

    return (
        <main className="page flex-center">
            <h1 className="title">SRMS</h1>
            <TwinScene />
            <WeatherCard
                weatherData={weatherData}
                loading={loading}
                error={error}
            />
            <div className="card stat flex-center">
                <h2 className="cardTitle">설비 상태</h2>
            </div>
        </main>
    );
}

export default HomePage;