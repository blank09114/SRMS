import type { Equipment } from "../types/Equipment";

interface EquipmentCardProps {
    equipment: Equipment | null;
}

export default function EquipmentCard({
    equipment,
}: EquipmentCardProps) {
    return (
        <div className="card equipment flex">
            <h2 className="cardTitle">
                {equipment
                    ? `설비 상태 - ${equipment.name}`
                    : "설비 상태"}
            </h2>
            <p className="cardText">
                {equipment
                    ? `${equipment.name}이(가) 선택됐습니다.`
                    : "선택한 설비의 정보가 표시됩니다."}
            </p>
        </div>
    );
}