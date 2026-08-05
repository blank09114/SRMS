import { useEffect, useState } from "react";

import { getWeather } from "../api/weatherApi";

import type { WeatherData } from "../types/WeatherData";

function HomePage() {

    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {

        async function loadWeather() {

            try {
                const data = await getWeather();
                setWeather(data);
            }
            catch (error) {
                console.error(error);
            }

        }

        loadWeather();

    }, []);

    if (!weather) { return <div>날씨 데이터를 불러오는 중...</div>; }

    return (

        <div>

            <h1>SRMS</h1>

            <p>기온 : {weather.temperature}℃</p>
            <p>습도 : {weather.humidity}%</p>
            <p>강수확률 : {weather.rainfallProbability}%</p>
            <p>강수량 : {weather.rainfall}mm</p>

        </div>

    );

}

export default HomePage;