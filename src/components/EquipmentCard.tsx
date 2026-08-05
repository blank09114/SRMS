import type { Equipment } from "../types/Equipment";
import type { EquipmentStatusMap } from "../types/EquipmentStatus";

interface EquipmentCardProps {
    equipment: Equipment | null;
    equipmentStatus: EquipmentStatusMap;
}

export default function EquipmentCard({
    equipment,
    equipmentStatus,
}: EquipmentCardProps) {
    const status =
    equipment
        ? equipmentStatus[equipment.id as keyof typeof equipmentStatus]
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
                        상태 : {status.status}
                    </p>
                    <p className="cardText">
                        {status.sensors.waterLevel !== undefined &&
                            <>수위: {status.sensors.waterLevel}%</>}

                        {status.sensors.flowRate !== undefined &&
                            <>유량: {status.sensors.flowRate} L/min</>}

                        {status.sensors.filterLoad !== undefined &&
                            <>필터 부하: {status.sensors.filterLoad}%</>}

                        {status.sensors.quality !== undefined &&
                            <>수질: {status.sensors.quality}</>}
                    </p>
                </>
            ) : (
                <p className="cardText">
                    선택한 설비의 정보가 표시됩니다.
                </p>
            )}
        </div>
    );
}