import type { EquipmentStatusMap } from "../types/EquipmentStatus";
import type { WeatherResponse } from "../types/WeatherResponse";

export type AnalysisLevel = "normal" | "warning" | "danger";

export interface AnalysisResult {
    level: AnalysisLevel;

    title: string;
    cause: string;

    evidence: string[];
    recommendation: string;
}

export function analyzeSystem(
    weather: WeatherResponse,
    equipment: EquipmentStatusMap,
): AnalysisResult[] {
    const results: AnalysisResult[] = [];

    const {
        temperature,
        humidity,
        rainfall,
        rainfallProbability,
    } = weather.weather;

    const tankLevel = equipment.tank.sensors.waterLevel ?? 0;
    const flowRate = equipment.pump.sensors.flowRate ?? 0;
    const filterLoad = equipment.filter.sensors.filterLoad ?? 0;
    const quality = equipment.reuseTank.sensors.quality ?? 0;

    // 정상
    if (results.length === 0) {
    results.push({
        level: "normal",
        title: "정상",
        cause: "현재 설비에서 이상 징후가 발견되지 않았습니다.",
        evidence: [ "모든 설비가 정상 범위에서 동작 중입니다.", ],
        recommendation: "현재 상태를 유지하십시오.",
    });
}

    // 저장탱크 과충전
    if (tankLevel >= 90) {
        results.push({
            level: "danger",
            title: "저장탱크 과충전 위험",
            cause: "저장탱크 수위가 안전 기준을 초과했습니다.",
            evidence: [
                `현재 수위 ${tankLevel.toFixed(1)}%`,
                "안전 기준 : 90% 이상",
            ],
            recommendation: "배출 상태를 확인하고 저장 용량을 확보하십시오.",
        });
    }

    // 필터 막힘
    if (filterLoad >= 90) {
        results.push({
            level: "danger",
            title: "필터 막힘",
            cause: "필터 부하가 매우 높아 여과 효율 저하가 예상됩니다.",
            evidence: [
                `필터 부하 ${filterLoad.toFixed(1)}%`,
                "위험 기준 : 90% 이상",
            ],
            recommendation: "필터를 점검하거나 교체하십시오.",
        });
    }

    // 재사용탱크 수질 저하
    if (quality <= 50) {
        results.push({
            level: "danger",
            title: "재사용수 수질 저하",
            cause: "재사용 가능한 물의 품질이 기준 이하입니다.",
            evidence: [
                `현재 수질 ${quality.toFixed(1)}%`,
                "정상 기준 : 50% 초과",
            ],
            recommendation: "재사용수를 배출하고 수질을 점검하십시오.",
        });
    }

    // 폭우 대비
    if (rainfallProbability >= 80 && rainfall >= 5) {
        results.push({
            level: "warning",
            title: "강우량 증가 예상",
            cause: "많은 강수가 예상되어 설비 부하가 증가할 수 있습니다.",
            evidence: [
                `강수확률 ${rainfallProbability}%`,
                `강수량 ${rainfall} mm`,
            ],
            recommendation: "저장탱크 용량을 확보하고 설비를 점검하십시오.",
        });
    }

    // 복합 이상
    if (tankLevel >= 80 && rainfallProbability >= 80) {
        results.push({
            level: "danger",
            title: "범람 위험",
            cause: "저장탱크가 높은 수위를 유지하는 상태에서 많은 강수가 예상됩니다.",
            evidence: [
                `저장탱크 수위 ${tankLevel.toFixed(1)}%`,
                `강수확률 ${rainfallProbability}%`,
            ],
            recommendation: "유입량을 줄이고 배출 설비를 우선 점검하십시오.",
        });
    }

    // 고온
    if (temperature >= 35) {
        results.push({
            level: "warning",
            title: "고온 환경",
            cause: "높은 기온으로 설비 효율 저하 가능성이 있습니다.",
            evidence: [
                `현재 기온 ${temperature}℃`,
            ],
            recommendation: "설비 상태를 점검하고 냉각 환경을 확인하십시오.",
        });
    }

    // 고습
    if (humidity >= 90) {
        results.push({
            level: "warning",
            title: "고습 환경",
            cause: "높은 습도로 인해 필터 부하가 증가할 수 있습니다.",
            evidence: [
                `현재 습도 ${humidity}%`,
            ],
            recommendation: "필터 상태를 확인하십시오.",
        });
    }

    // 정상
    if (results.length === 0) {
        results.push({
            level: "warning",
            title: "이상 없음",
            cause: "현재 설비에서 이상 징후가 발견되지 않았습니다.",
            evidence: [
                "모든 설비가 정상 범위에서 동작 중입니다.",
            ],
            recommendation: "현재 상태를 유지하십시오.",
        });
    }

    return results;
}