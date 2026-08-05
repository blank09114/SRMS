import TwinScene from "../components/TwinScene";

function HomePage() {
    return (
        <main className="page flex-center">
            <h1 className="title">SRMS</h1>
            <TwinScene />
            <div className="card weather flex-center">
                <h2 className="cardTitle">기상 정보</h2>
                <p className="cardText">
                    기온: <br />
                    습도: <br />
                    강수 확률: <br />
                    강수량: <br />
                </p>
                <p className="cardText">
                    데이터 출처: 기상청 단기예보 조회 서비스 <br />
                    마지막 조회: 
                </p>
            </div>
            <div className="card stat flex-center">
                <h2 className="cardTitle">설비 상태</h2>
            </div>
        </main>
    );
}

export default HomePage;