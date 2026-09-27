# React Query Auth Client

Next.js(App Router) + React Query 기반 인증 프론트엔드입니다.

## 사전 요구 사항

- Node.js
- `pnpm`
- 서버 실행 중 (`http://localhost:5001`)

## 실행 방법

설치와 실행은 저장소 루트 `README.md`의 순서를 따릅니다. 개발 서버는 저장소 루트에서 다음 명령으로 실행합니다.

```bash
pnpm --dir client dev
```

- 기본 URL: `http://localhost:3000`

## 서버 연결

- 브라우저에서 서버를 직접 호출합니다. 기본 주소는 `http://localhost:5001`이며 `/api` 경로는 프론트 요청 유틸에서 자동으로 붙습니다.

## 현재 시작 상태

- 기본 회원가입·로그인 폼과 직접 API 요청이 준비되어 있습니다.
- 현재 로그인한 사용자 조회, React Query mutation과 캐시 반영은 수업에서 추가합니다.
- 마지막 장에서 폼 상태와 mutation 책임을 역할별 훅으로 분리합니다.
