import { useState } from "react";

import type { AnalysisResult } from "../services/analysisService";

interface Props { analysis: AnalysisResult[]; }

export default function WarningCard({ analysis }: Props) {
    const [openedIndex, setOpenedIndex] = useState<number | null>(0);
    const isNormal = analysis.length === 1 && analysis[0].level === "normal";

    return (
        <div className="card warning flex">
            <h2 className="cardTitle">AX 이상징후 분석</h2>
            {isNormal ? (<p className="cardText"> 모든 설비가 정상 동작 중입니다. </p>) : (
                analysis.map((item, index) => {
                    const opened = openedIndex === index;

                    return (
                        <div
                            key={`${item.title}-${index}`}
                            className={`analysisItem ${ index === analysis.length - 1 ? "last" : "" }`}
                        >
                            <div
                                className="analysisHeader"
                                onClick={() => setOpenedIndex(opened ? null : index)}
                            >
                                <span className={ item.level === "danger"? "analysisBadge danger": "analysisBadge warning" }>
                                    {item.level === "danger"? "위험": "주의"}
                                </span>
                                <span className="analysisTitle"> {item.title} </span>
                                <span className="analysisArrow"> {opened ? "▼" : "◀"} </span>
                            </div>

                            {opened && (
                                <>
                                    <div className="analysisSection">
                                        <p className="cardText"> <strong>원인</strong> </p>
                                        <p className="cardText"> {item.cause} </p>
                                    </div>
                                    <div className="analysisSection">
                                        <p className="cardText"> <strong>판단 근거</strong> </p>
                                        <ul className="analysisEvidence">
                                            {item.evidence.map((evidence) => ( <li key={evidence}> {evidence} </li>))}
                                        </ul>
                                    </div>
                                    <div className="analysisSection">
                                        <p className="cardText"> <strong>권장 조치</strong> </p>
                                        <p className="cardText"> {item.recommendation} </p>
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}