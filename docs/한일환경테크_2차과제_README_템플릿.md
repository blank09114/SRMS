# 한일환경테크 2차 과제 - 산업용 Open API 데이터 기반 3D 디지털 트윈·AX 프로토타입

- 지원자명:
- 제출일:
- 배포 URL:
- Git 저장소 URL:
- 시연 영상 URL:

---

## 1. 프로젝트 개요

- 프로젝트명:
- 프로젝트 목적:
- 구현 범위:
- 주요 기능:
  -
  -

## 2. 사용 기술

| 구분 | 사용 기술 |
| --- | --- |
| 프론트엔드 |  |
| 백엔드 |  |
| 3D 기술 |  |
| 데이터베이스 |  |
| Open API |  |
| AI 또는 이상 탐지 기술 |  |
| 개발 도구 |  |

## 3. 프로젝트 구조

```text
project-root/
├── src/
│   ├── ...        # 역할 설명
│   └── ...        # 역할 설명
├── public/
├── .env.example
└── README.md
```

- 주요 폴더 및 파일 역할:
  -

## 4. 설치 방법

- 필요한 프로그램 및 버전:
- 필요한 라이브러리:
- 설치 명령:

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

## 5. 실행 방법

1. 환경변수 파일 생성 (`.env`)
2. 개발 서버 실행

```bash
npm run dev
```

3. 브라우저에서 접속: http://localhost:5173

## 6. 환경변수 설정

실제 API 키는 절대 기록하지 않습니다. 변수명만 작성합니다.

```env
PUBLIC_DATA_API_KEY=
KMA_API_KEY=
AIRKOREA_API_KEY=
OPENAI_API_KEY=
```

## 7. Open API 연동 설명

- API 제공 기관:
- API 이름:
- API 데이터 출처(URL):
- 호출 방법(엔드포인트/HTTP 메서드):
- 사용한 주요 요청값:
- 응답 데이터 구조:

```json
{
}
```

- 오류 처리 방법:

## 8. 데이터 표준화 방법

- 원본 응답 구조:
- 표준 데이터 구조:

```ts
interface SensorData {
  timestamp: string;
  sensorId: string;
  sensorName: string;
  sensorType: string;
  value: number;
  unit: string;
  location: string;
  status: "normal" | "warning" | "danger";
  isAnomaly: boolean;
  source: string;
}
```

- 컬럼 변환 방법:
- 결측값 처리:
- 중복값 처리:
- 시간 형식 처리:

## 9. 3D 구현 설명

- 사용한 3D 기술:
- 설비 구성(최소 4종):
  -
- 객체 선택 방법:
- 센서와 3D 객체 연결 방법:
- 상태별 시각화 방법(정상·주의·위험):

## 10. 이상징후 판단 방법

- 사용한 알고리즘:
- 판단 기준(임계값 등):
- 기준 선택 이유:
- 정상·주의·위험 구분 방법:
- 한계점:

## 11. AI·AX 활용 내역

- 사용한 AI 도구:
- AI를 활용한 부분:
- 주요 프롬프트:
- 생성 결과 중 직접 수정한 부분:
- 오류를 검증한 방법:
- 지원자가 직접 구현한 부분:

## 12. 실행 결과

- 주요 화면:
- 정상 상태:
- 이상 상태:
- 알람 발생 화면:
- 분석 결과:

## 13. 미구현 사항 및 한계

- 구현하지 못한 기능:
- 발생한 문제:
- 해결하지 못한 이유:
- 추가 개발 방향:

## 14. 참고자료 및 출처

- 공개 3D 모델:
- 이미지:
- 라이브러리:
- 데이터 출처:
- 참고 문서:
