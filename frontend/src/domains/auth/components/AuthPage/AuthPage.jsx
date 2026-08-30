"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers, checkBackendHealth } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import * as styles from "./AuthPage.css.js";
import AuthHero from "@/domains/auth/components/AuthHero";
import AuthModeSwitch from "@/domains/auth/components/AuthModeSwitch";
import LoginForm from "@/domains/auth/components/LoginForm";
import SignUpForm from "@/domains/auth/components/SignUpForm";
import UserListSection from "@/domains/auth/components/UserListSection";
import useAuthPage from "@/domains/auth/hooks/useAuthPage";
import { AUTH_MODE } from "@/domains/auth/utils/constants";

export default function AuthPage() {
  const {
    mode,
    formError,
    formSuccess,
    createdEmail,
    signUpForm,
    loginForm,
    signUpErrors,
    loginErrors,
    signUpMutation,
    loginMutation,
    handleModeChange,
    handleSignUpInput,
    handleLoginInput,
    handleSignUpSubmit,
    handleLoginSubmit,
  } = useAuthPage();

  const usersQuery = useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: getUsers,
  });

  const healthQuery = useQuery({
    queryKey: queryKeys.backend.health(),
    queryFn: checkBackendHealth,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const isUserCreated = Boolean(
    createdEmail &&
    usersQuery.data?.some((user) => user.email === createdEmail),
  );

  const apiStatusText = healthQuery.isPending
    ? "백엔드 상태를 확인하는 중입니다."
    : healthQuery.isError
      ? "백엔드 연결 실패"
      : "백엔드 연결 정상";

  const authFormContentByMode = {
    [AUTH_MODE.SIGN_UP]: (
      <SignUpForm
        form={signUpForm}
        errors={signUpErrors}
        onInput={handleSignUpInput}
        onSubmit={handleSignUpSubmit}
        isPending={signUpMutation.isPending}
      />
    ),
    [AUTH_MODE.LOGIN]: (
      <LoginForm
        form={loginForm}
        errors={loginErrors}
        onInput={handleLoginInput}
        onSubmit={handleLoginSubmit}
        isPending={loginMutation.isPending}
      />
    ),
  };

  return (
    <main className={styles.page}>
      <div className={styles.backdropCircleOne} />
      <div className={styles.backdropCircleTwo} />

      <AuthHero
        mode={mode}
        apiStatusText={apiStatusText}
        isApiError={healthQuery.isError}
        authStatusText="세션 조회를 추가하기 전입니다."
        isAuthError={false}
        isAuthenticated={false}
        createdEmail={createdEmail}
        isUserCreated={isUserCreated}
      />

      <section className={styles.panel}>
        <AuthModeSwitch mode={mode} onChange={handleModeChange} />

        {formError ? (
          <p className={styles.formError}>{formError}</p>
        ) : formSuccess ? (
          <p className={styles.formSuccess}>{formSuccess}</p>
        ) : null}

        {authFormContentByMode[mode] ?? authFormContentByMode[AUTH_MODE.LOGIN]}

        <UserListSection usersQuery={usersQuery} createdEmail={createdEmail} />
      </section>
    </main>
  );
}
