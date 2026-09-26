# React Query Auth Client

Next.js(App Router) + React Query 기반 인증 프론트엔드입니다.

## 사전 요구 사항

- Node.js
- `pnpm`
- 백엔드 서버 실행 중 (`http://localhost:5001`)

## 실행 방법

설치와 실행은 저장소 루트 `README.md`의 순서를 따릅니다. 개발 서버는 저장소 루트에서 다음 명령으로 실행합니다.

```bash
pnpm --dir client dev
```

- 기본 URL: `http://localhost:3000`

## 백엔드 연결

- 브라우저에서 백엔드를 직접 호출합니다. 기본 주소는 `http://localhost:5001`이며 `/api` 경로는 프론트 요청 유틸에서 자동으로 붙습니다.
- 환경 변수 파일 없이 기본 주소로 요청합니다. 서버 주소를 바꾼 경우에만 `.env.example`을 `.env.development`로 복사해 `NEXT_PUBLIC_BACKEND_BASE_URL`을 맞춥니다.
- 백엔드에서 CORS(`origin`, `credentials`) 설정이 필요합니다.

## 현재 시작 상태

- 기본 회원가입·로그인 폼과 직접 API 요청이 준비되어 있습니다.
- 현재 로그인한 사용자 조회, React Query mutation과 캐시 반영은 수업에서 추가합니다.
- 마지막 장에서 폼 상태와 mutation 책임을 역할별 훅으로 분리합니다.

## 주요 스크립트

```bash
pnpm dev     # 개발 서버
pnpm build   # 프로덕션 빌드
pnpm start   # 프로덕션 실행
pnpm lint    # ESLint
pnpm format  # Prettier 포맷
pnpm format:check # Prettier 포맷 검사
```
