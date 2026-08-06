export default function WarningCard() {
    return (
        <div className="card warning flex">
            <h2 className="cardTitle">경고</h2>
            <h3 className="cardTitle sub">현재 경고 목록</h3>
            <p className="cardText">
                <span className="status-warning">많은 강수가 예상됩니다.</span> <br/>
                <span className="status-danger">필터가 막혔습니다.</span>
            </p>
            <h3 className="cardTitle sub">권장 조치</h3>
            <p className="cardText">
                재사용탱크 용량을 확보하십시오. <br/>
                필터를 교체하십시오.
            </p>
        </div>
    );
}