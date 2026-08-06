import { useEffect, useState } from "react";

import TwinScene from "../components/TwinScene";
import WeatherCard from "../components/WeatherCard";
import EquipmentCard from "../components/EquipmentCard";
import WarningCard from "../components/WarningCard";

import { getWeather } from "../api/weatherApi";
import { createMixedDemoWeather } from "../data/demoWeather";
import { getEquipmentStatus } from "../services/statusService";
import { analyzeSystem } from "../services/analysisService";

import type { WeatherResponse } from "../types/WeatherResponse";
import type { Equipment } from "../types/Equipment";

function HomePage() {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
    const [demoMode, setDemoMode] = useState(
        () => new URLSearchParams(window.location.search).get("demo") === "bad",
    );

    // 기상청 API 데이터를 기반으로 설비 상태 정보를 생성
    const equipmentStatus = weatherData? getEquipmentStatus(weatherData.sensors): null;

    // 모니터링 정보
    const analysis = weatherData && equipmentStatus? analyzeSystem(weatherData, equipmentStatus): [];

    useEffect(() => {
        let active = true;

        async function loadWeather() {
            try {
                setLoading(true);
                setError(null);

                const data = demoMode
                    ? createMixedDemoWeather()
                    : await getWeather();

                if (!active) return;
                setWeatherData(data);
            } catch (error) {
                if (!active) return;
                console.error(error);
                setError("기상 정보를 불러오지 못했습니다.");
            } finally {
                if (active) setLoading(false);
            }
        }

        loadWeather();

        return () => { active = false; };
    }, [demoMode]);

    return (
        <main className="page flex-center">
            <h1 className="title">Smart Rainwater Monitoring System</h1>
            <div className={`demoToolbar ${demoMode ? "demoMode" : ""}`}>
                <span className="demoLabel"> {demoMode ? "시연 데이터" : "실시간 데이터"} </span>
                <label className="switch">
                    <input
                        className="switchInput"
                        type="checkbox"
                        checked={demoMode}
                        aria-label="시연 모드"
                        onChange={(event) => setDemoMode(event.target.checked)}
                    />
                    <span className="switchTrack"> <span className="switchThumb" /> </span>
                </label>
            </div>
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
            <WarningCard analysis={analysis} />
        </main>
    );
}

export default HomePage;
