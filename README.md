# React Query Auth Starter

이 프로젝트는 회원가입·로그인 화면에 React Query를 적용하기 위한 시작 코드입니다. 수업을 따라 현재 로그인한 사용자를 서버에서 조회해 로그인 상태를 표시하고, 회원가입·로그인·로그아웃 결과가 새로고침 없이 화면에 반영되도록 만든 뒤, 한 훅에 모여 있는 폼 상태와 요청 처리를 역할별 훅으로 나눕니다.

## 폴더 구성

- `client/`: Next.js와 React Query로 만든 인증 화면입니다. 수업에서는 이 폴더의 코드를 수정합니다.
- `server/`: Express와 Prisma로 만든 인증 API 서버입니다. 회원가입·로그인·로그아웃·현재 사용자 조회 API가 준비되어 있으며 수업에서는 수정하지 않습니다.

## 제공된 코드와 구현할 범위

처음부터 준비되어 있는 코드는 다음과 같습니다.

- 회원가입·로그인 폼, 입력 검증, 두 폼 사이의 전환(`client/src/features/auth/`)
- 서버에 요청을 보내는 함수(`client/src/lib/api/`)
- 앱 전체에 `QueryClient`를 공급하는 Provider(`client/src/providers/`)

수업에서 구현하는 기능은 다음과 같습니다.

- 현재 로그인한 사용자를 조회해 `로그인 상태` 카드에 표시하기
- 회원가입·로그인·로그아웃을 mutation으로 처리하고 결과를 캐시에 반영하기
- 폼 상태와 요청 처리를 역할별 훅으로 나누기

수업에서 새로 만들거나 수정하는 파일은 모두 `client/src/lib/`와 `client/src/features/auth/` 아래에 있습니다. 모든 장은 이 저장소 하나에서 코드를 이어서 수정합니다.

## 시작하기

### 1. 코드 받기와 의존성 설치

저장소 루트에서 두 폴더의 의존성을 각각 설치합니다.

```bash
git clone https://github.com/winverse/codeit-fs-react-query-auth-starter.git
cd codeit-fs-react-query-auth-starter

pnpm --dir client install
pnpm --dir server install
```

### 2. 서버 환경 변수 파일 준비

예시 파일을 복사해 서버의 개발용 환경 변수 파일을 만듭니다.

```bash
cp server/env/.env.example server/env/.env.development
```

`server/env/.env.development`를 열어 다음 값을 확인하고 채웁니다.

| 변수                 | 값                                                           |
| -------------------- | ------------------------------------------------------------ |
| `NODE_ENV`           | `development`(예시 파일 값 그대로)                           |
| `PORT`               | `5001`(예시 파일 값 그대로)                                  |
| `CORS_ORIGIN`        | `http://localhost:3000`(예시 파일 값 그대로)                 |
| `DATABASE_URL`       | `postgresql://postgres:<비밀번호>@localhost:5432/react-auth` |
| `JWT_ACCESS_SECRET`  | 32자 이상의 임의 문자열                                      |
| `JWT_REFRESH_SECRET` | 32자 이상의 임의 문자열                                      |

`DATABASE_URL`의 `<비밀번호>`는 PostgreSQL을 설치할 때 정한 `postgres` 사용자의 비밀번호로 바꿉니다. 비밀번호 없이 접속하는 환경이면 `:<비밀번호>`를 지워 `postgresql://postgres@localhost:5432/react-auth`로 씁니다.

프론트엔드는 환경 변수 파일 없이도 `http://localhost:5001`의 서버로 요청하므로 `client`에는 환경 변수 파일을 만들지 않아도 됩니다.

### 3. PostgreSQL 데이터베이스 만들기

로컬 PostgreSQL에 `react-auth` 데이터베이스를 만듭니다.

- macOS/Linux (zsh, bash)

```bash
psql -U postgres -d postgres -c 'CREATE DATABASE "react-auth";'
```

- Windows (`SQL Shell (psql)`)

1. 시작 메뉴에서 `psql`을 검색해 `SQL Shell (psql)`을 실행합니다.
2. 프롬프트가 나오면 아래처럼 입력합니다.

```text
Server [localhost]:
Database [postgres]:
Port [5432]:
Username [postgres]:
Password for user postgres:
```

`Server`, `Database`, `Port`, `Username`은 기본값이면 `Enter`만 눌러도 됩니다.
로그인 후 아래 SQL을 실행합니다.

```sql
CREATE DATABASE "react-auth";
\q
```

### 4. 데이터베이스 테이블 만들기

저장소 루트에서 Prisma Client를 생성하고 데이터베이스에 테이블을 만듭니다.

```bash
pnpm --dir server prisma:generate
pnpm --dir server prisma:migrate
```

`Your database is now in sync with your schema.`가 보이면 데이터베이스 준비가 끝난 것입니다.

### 5. 개발 서버 실행

터미널 두 개를 열어 저장소 루트에서 서버와 프론트엔드 개발 서버를 각각 실행합니다.

```bash
# 터미널 1
pnpm --dir server dev

# 터미널 2
pnpm --dir client dev
```

터미널 1에 `[development] Server running at http://localhost:5001`이 보이면 서버가 실행된 것입니다.

### 6. 처음 화면 확인

브라우저에서 `http://localhost:3000`에 접속하면 `로그인 상태` 카드의 `세션 조회를 추가하기 전입니다.` 문구와 회원가입·로그인 폼이 보입니다.

회원가입 폼에 이름·이메일·비밀번호를 입력하고 `회원가입` 버튼을 누르면 폼 위에 `회원가입 완료: <이메일>`이 표시됩니다. 이 메시지가 보이면 서버와 데이터베이스까지 준비가 끝난 것입니다. 아직 로그인 상태 조회를 만들기 전이므로 `로그인 상태` 카드의 문구는 바뀌지 않습니다.
