import { useState } from "react";

import type { AnalysisResult } from "../services/analysisService";

interface Props { analysis: AnalysisResult[]; }

export default function WarningCard({ analysis }: Props) {
    const [openedIndex, setOpenedIndex] = useState<number | null>(0);

    return (
        <div className="card warning flex">
            <h2 className="cardTitle">AX 이상징후 분석</h2>
            {analysis.length === 0 ? (
                <p className="cardText"> 현재 이상징후가 발견되지 않았습니다. </p>
            ) : (
                analysis.map((item, index) => {
                    const opened = openedIndex === index;

                    return (
                        <div
                            key={`${item.title}-${index}`}
                            className={`analysisItem ${ index === analysis.length - 1 ? "last" : "" }`}
                        >
                            <button className="analysisHeader"
                                onClick={() => setOpenedIndex(opened ? null : index) }
                            >
                                <span className={ item.level === "danger"? "analysisBadge danger": "analysisBadge warning" }>
                                    {item.level === "danger"? "위험": "주의"}
                                </span>
                                <span className="analysisTitle"> {item.title} </span>
                                <span className="analysisArrow"> {opened ? "▼" : "▶"} </span>
                            </button>

                            {opened && (
                                <>
                                    <div className="analysisSection">
                                        <div className="analysisLabel"> 원인 </div>
                                        <p className="cardText"> {item.cause} </p>
                                    </div>
                                    <div className="analysisSection">
                                        <div className="analysisLabel"> 판단 근거 </div>
                                        <ul className="analysisEvidence">
                                            {item.evidence.map((evidence) => ( <li key={evidence}> {evidence} </li>))}
                                        </ul>
                                    </div>
                                    <div className="analysisSection">
                                        <div className="analysisLabel"> 권장 조치 </div>
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