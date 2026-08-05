import { useEffect, useState } from "react";

import TwinScene from "../components/TwinScene";
import WeatherCard from "../components/WeatherCard";
import EquipmentCard from "../components/EquipmentCard";

import { getWeather } from "../api/weatherApi";
import { getEquipmentStatus } from "../services/statusService";

import type { WeatherResponse } from "../types/WeatherResponse";
import type { Equipment } from "../types/Equipment";

function HomePage() {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

    // 기상청 API 데이터를 기반으로 설비 상태 정보를 생성
    const equipmentStatus = weatherData? getEquipmentStatus(weatherData.sensors): null;

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
            <h1 className="title">Smart Rainwater Monitoring System</h1>
            <TwinScene
                selectedEquipment={selectedEquipment}
                equipmentStatus={equipmentStatus}
                onSelectEquipment={setSelectedEquipment}
            />
            <WeatherCard
                weatherData={weatherData}
                loading={loading}
                error={error}
            />
            <EquipmentCard
                equipment={selectedEquipment}
                equipmentStatus={equipmentStatus}
            />
        </main>
    );
}

export default HomePage;