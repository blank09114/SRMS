# 한일환경테크 2차 과제 - 산업용 Open API 데이터 기반 3D 디지털 트윈·AX 프로토타입

- 지원자명: 박예린
- 제출일: 2026.08.05
- 배포 URL:
- Git 저장소 URL: https://github.com/blank09114/SRMS
- 시연 영상 URL:

---

## 1. 프로젝트 개요

- 프로젝트명: Smart Rainwater Monitoring System(SRMS)
- 프로젝트 목적: Open API로 수집한 기상 데이터를 활용해 빗물 재활용 시설(Rainwater Recycling Facility)의 설비 상태 모니터링
- 구현 범위:
  - 기상청 Open API 연동
  - 기상 데이터 조회 및 화면 출력
  - API 응답 데이터 가공
  - WeatherData → SensorData 표준화
  - API 예외 처리
  - 원본 API 응답(JSON) 확인 기능
  - 표준화된 SensorData(JSON) 확인 기능
- 주요 기능:
  - 기온, 습도, 강수확률, 강수량 조회
  - WeatherData 생성
  - SensorData 표준화
  - 마지막 조회 시각 표시
  - 데이터 출처 표시
  - 원본 API 응답(JSON) 보기/숨기기
  - 표준화된 SensorData(JSON) 보기/숨기기

## 2. 사용 기술

| 구분 | 사용 기술 |
| --- | --- |
| 프론트엔드 | React, TypeScript, Vite |
| 백엔드·데이터베이스 | 없음(Open API 직접 연동 및 메모리 기반 상태 관리) |
| 3D 기술 | React Three Fiber, Three.js |
| Open API | 기상청 단기예보조회서비스 |
| 이상 탐지 기술 | 임계값(Threshold) 기반 이상 탐지·상태 판정 |
| 개발 도구 | Git/GitHub, VS Code, npm |

## 3. 프로젝트 구조

```text
SRMS/
├─ docs/ # 프로젝트 문서
├─ result/ # 실행 화면 캡처 및 시연 영상
├─ src/
│   ├─ api/
│   ├─ assets/
│   ├─ components/
│   ├─ data/
│   ├─ hooks/
│   ├─ models/
│   ├─ pages/
│   ├─ services/
│   ├─ types/
│   ├─ utils/
│   └─ App.tsx
├─ .env
└─ README.md
```

- 주요 폴더 및 파일 역할:

| 경로 | 역할 |
|------|------|
| docs/ | 프로젝트 문서 |
| result/ | 실행 화면 캡처 및 제출 자료 |
| src/api | Open API 호출 |
| src/pages | 화면 구성 |
| src/services | API 응답 데이터 가공 |
| src/types | TypeScript 타입 정의 |
| src/utils | 공통 유틸리티 함수 |

## 4. 설치 방법

- 필요한 프로그램 및 버전: Node.js 22 이상, npm 10 이상
- 필요한 라이브러리: React, React DOM, TypeScript, Vite

- 설치 명령:

```bash
git clone https://github.com/blank09114/SRMS
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

```env
VITE_KMA_SERVICE_KEY=
```

## 7. Open API 연동 설명

- API 제공 기관: 기상청
- API 이름: 단기예보 조회서비스
- API 데이터 출처(URL): https://www.data.go.kr/
- 호출 방법(엔드포인트/HTTP 메서드): GET https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst
- 사용한 주요 요청값: serviceKey, base_date, base_time, nx, ny, dataType

- 응답 데이터 구조:

```json
{
    "response": {
        "header": {
            "resultCode": "00",
            "resultMsg": "NORMAL_SERVICE"
        },
        "body": {
            "items": {
                "item": [
                    {
                        "category": "TMP",
                        "fcstValue": "26"
                    }
                ]
            }
        }
    }
}
```

- 오류 처리 방법:
  - HTTP 응답 코드 확인(response.ok)
  - API resultCode 확인
  - try-catch를 통한 예외 처리
  - 오류 발생 시 사용자에게 오류 메시지 출력

## 8. 데이터 표준화 방법

- 기상청 Open API 응답을 WeatherData 객체로 가공한 후 SensorData 구조로 표준화
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
  - `WeatherData`를 `sensorMapper`를 통해 `SensorData[]`로 변환
  - 센서 ID, 이름, 타입, 단위는 메타데이터로 관리하여 공통 SensorData 구조를 생성
- 결측값 처리: 강수량이 `"강수없음"`인 경우 `0(mm)`으로 변환
- 중복값 처리: 동일 예보 시각(fcstTime)의 데이터만 선택하여 변환하므로 중복 데이터가 생성되지 않음
- 시간 형식 처리: 센서 데이터 생성 시 `Date.toISOString()`을 사용하여 ISO 8601 형식으로 저장

## 9. 3D 구현 설명

※미구현

- 사용한 3D 기술:
- 설비 구성(최소 4종):
  -
- 객체 선택 방법:
- 센서와 3D 객체 연결 방법:
- 상태별 시각화 방법(정상·주의·위험):

## 10. 이상징후 판단 방법

※미구현

- 사용한 알고리즘:
- 판단 기준(임계값 등):
- 기준 선택 이유:
- 정상·주의·위험 구분 방법:
- 한계점:

## 11. AI·AX 활용 내역

- 사용한 AI 도구: ChatGPT
- AI를 활용한 부분:
  - 프로젝트 구조 설계
  - API 응답 구조 분석
  - README 작성 보조
- 주요 프롬프트:
  - 기상청 Open API 연동 방법
  - React 프로젝트 구조 설계
  - TypeScript 타입 정의
  - README 초안 작성
- 생성 결과 중 직접 수정한 부분:
  - API 응답 구조에 맞게 데이터 가공 로직 수정
  - 예외 처리 로직 수정
  - 프로젝트 구조 수정
- 오류를 검증한 방법:
  - 브라우저 개발자도구(Console, Network)
  - 실제 API 응답과 비교 검증
  - TypeScript 컴파일 오류 확인
- 지원자가 직접 구현한 부분:
  - 프로젝트 기획
  - GIT 브랜치 전략
  - React 프로젝트 구성
  - Open API 연동
  - 데이터 가공
  - 예외 처리
  - 화면 구현

## 12. 실행 결과

- 주요 화면:
  - 기상 데이터 조회 화면
  - 원본 API 응답(JSON) 확인 화면
  - SensorData(JSON) 확인 화면
- 정상 상태: 기상 데이터를 정상적으로 조회하고 화면에 출력
- 이상 상태: 미구현
- 알람 발생 화면: 미구현
- 분석 결과: 미구현

## 13. 미구현 사항 및 한계

- 구현하지 못한 기능:
  - 3D 디지털 트윈
  - 센서 데이터 연동
  - 이상 탐지 및 AI 분석
- 발생한 문제: 기상청 Open API의 응답 구조가 복잡해 데이터 가공 과정 필요
- 해결하지 못한 이유: 단계별 진행에 따라 현재 Open API 연동 구현에 집중
- 추가 개발 방향: 
  - React Three Fiber 기반 3D 시각화
  - 설비 상태 모니터링
  - 이상 탐지 및 AI 기반 운영 지원 기능 추가

## 14. 참고자료 및 출처

- 공개 3D 모델: 미구현
- 이미지: 없음
- 라이브러리: React, Vite, TypeScript
- 데이터 출처: 공공데이터포털
- 참고 문서: 없음