# React Query Auth Frontend

Next.js(App Router) + React Query 기반 인증 프론트엔드입니다.

## 사전 요구 사항

- Node.js
- `pnpm`
- 백엔드 서버 실행 중 (`http://localhost:5001`)

## 실행 방법

1. 의존성 설치

```bash
pnpm install
```

2. 환경 변수 파일 생성

```bash
cp .env.example .env.development
```

3. `NEXT_PUBLIC_BACKEND_BASE_URL` 확인

```env
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:5001
```

- `/api` 경로는 프론트 요청 유틸에서 자동으로 붙습니다.

4. 개발 서버 실행

```bash
pnpm dev
```

- 기본 URL: `http://localhost:3000`

## 백엔드 연결

- 브라우저에서 백엔드를 직접 호출합니다.
- 백엔드에서 CORS(`origin`, `credentials`) 설정이 필요합니다.

## 현재 시작 상태

- 기본 회원가입·로그인 폼과 직접 API 요청이 준비되어 있습니다.
- 현재 사용자 조회, React Query mutation과 인증 캐시 동기화는 수업에서 추가합니다.
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
