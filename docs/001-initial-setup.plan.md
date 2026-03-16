# 초기 세팅 계획

## 목표
- 공공기관 인증 화면에서 민간인증서용 개인정보 입력을 보조하는 크롬 확장 프로그램의 초기 구조를 마련
- 개발 환경에서 `build`, `lint` 검증이 가능하도록 설정 정합성을 맞춤

## 작업 범위
- 의존성 설치 상태 점검
- TypeScript, ESLint, Vite 설정 정리
- 팝업 UI 최소 구조 추가
- background, content script 엔트리 연결 상태 점검
- README 임시 정리

## 제외 범위
- 특정 사이트 전용 정밀 셀렉터 튜닝
- 실제 배포 패키징 자동화
- 민감정보 암호화 저장
- 개인정보 저장 로직
- 자동입력 기능 구현

## 검증 기준
- `npm run build` 성공
- `npm run lint` 성공
- 팝업, background, content script 엔트리가 정상 빌드됨
