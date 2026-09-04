"use client";

import * as styles from "./AuthPage.css.js";
import { AuthHero } from "@/domains/auth/components/AuthHero";
import { AuthModeSwitch } from "@/domains/auth/components/AuthModeSwitch";
import { LoginForm } from "@/domains/auth/components/LoginForm";
import { SignUpForm } from "@/domains/auth/components/SignUpForm";
import useAuthPage from "@/domains/auth/hooks/useAuthPage";
import { AUTH_MODE } from "@/domains/auth/utils/constants";

export default function AuthPage() {
  const {
    mode,
    formError,
    formSuccess,
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
        authStatusText="세션 조회를 추가하기 전입니다."
        isAuthError={false}
        isAuthenticated={false}
      />

      <section className={styles.panel}>
        <AuthModeSwitch mode={mode} onChange={handleModeChange} />

        {formError ? (
          <p className={styles.formError}>{formError}</p>
        ) : formSuccess ? (
          <p className={styles.formSuccess}>{formSuccess}</p>
        ) : null}

        {authFormContentByMode[mode] ?? authFormContentByMode[AUTH_MODE.LOGIN]}
      </section>
    </main>
  );
}
