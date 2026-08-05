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
    const equipmentStatus = getEquipmentStatus();

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