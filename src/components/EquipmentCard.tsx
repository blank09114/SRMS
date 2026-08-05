import type { Equipment } from "../types/Equipment";
import type { EquipmentStatusMap } from "../types/EquipmentStatus";

import { getStatusText } from "../utils/getStatusText";

interface EquipmentCardProps {
    equipment: Equipment | null;
    equipmentStatus: EquipmentStatusMap | null;
}

// 현재 선택된 설비의 상태 정보 출력
export default function EquipmentCard({ equipment, equipmentStatus, }: EquipmentCardProps) {
    const status =
        equipment && equipmentStatus
            ? equipmentStatus[equipment.id as keyof EquipmentStatusMap]
            : null;

    return (
        <div className="card equipment flex">
            <h2 className="cardTitle">
                {equipment
                    ? `설비 상태 - ${equipment.name}`
                    : "설비 상태"}
            </h2>
            {equipment && status ? (
                <>
                    <p className="cardText">
                        상태: <span className={status.status === "normal"? "": `status-${status.status}`}>
                            {getStatusText(status.status)}
                        </span> <br/>
                        {/* 선택된 설비의 상태 및 센서 정보 출력 */}
                        {status.sensors.waterLevel !== undefined &&
                            <>수위: {status.sensors.waterLevel?.toFixed(1)}%</>}
                        {status.sensors.flowRate !== undefined &&
                            <>유량: {status.sensors.flowRate?.toFixed(1)} L/min</>}
                        {status.sensors.filterLoad !== undefined &&
                            <>필터 부하: {status.sensors.filterLoad?.toFixed(1)}%</>}
                        {status.sensors.quality !== undefined &&
                            <>수질: {status.sensors.quality?.toFixed(1)}</>}
                    </p>
                </>
            ) : (
                <p className="cardText">선택한 설비의 정보가 표시됩니다.</p>
            )}
        </div>
    );
}