export interface AnalysisResult {
    level: "info" | "warning" | "danger";
    title: string;
    cause: string;
    evidence: string[];
    recommendation: string;
}