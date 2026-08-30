import { useState } from "react";
import { login, logout, signUp } from "@/lib/api";
import {
  AUTH_INITIAL_LOGIN_FORM,
  AUTH_INITIAL_SIGN_UP_FORM,
  AUTH_MODE,
} from "@/domains/auth/utils/constants";
import {
  createEmptyLoginErrors,
  createEmptySignUpErrors,
  validateLoginForm,
  validateSignUpForm,
} from "@/domains/auth/utils/validation";

export default function useAuthPage() {
  const [mode, setMode] = useState(AUTH_MODE.SIGN_UP);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [createdEmail, setCreatedEmail] = useState("");
  const [signUpForm, setSignUpForm] = useState(() => ({
    ...AUTH_INITIAL_SIGN_UP_FORM,
  }));
  const [loginForm, setLoginForm] = useState(() => ({
    ...AUTH_INITIAL_LOGIN_FORM,
  }));
  const [signUpErrors, setSignUpErrors] = useState(() =>
    createEmptySignUpErrors(),
  );
  const [loginErrors, setLoginErrors] = useState(() =>
    createEmptyLoginErrors(),
  );
  const [isSignUpPending, setIsSignUpPending] = useState(false);
  const [isLoginPending, setIsLoginPending] = useState(false);
  const [isLogoutPending, setIsLogoutPending] = useState(false);

  const resetSignUpFormState = () => {
    setSignUpForm(() => ({ ...AUTH_INITIAL_SIGN_UP_FORM }));
    setSignUpErrors(createEmptySignUpErrors());
  };

  const resetLoginFormState = () => {
    setLoginForm(() => ({ ...AUTH_INITIAL_LOGIN_FORM }));
    setLoginErrors(createEmptyLoginErrors());
  };

  const handleSignUpInput = (event) => {
    const { name, value } = event.target;

    setFormError((prev) => (prev ? "" : prev));
    setSignUpErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginInput = (event) => {
    const { name, value } = event.target;

    setFormError((prev) => (prev ? "" : prev));
    setLoginErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const { isValid, errors, payload } = validateSignUpForm(signUpForm);
    setSignUpErrors(errors);

    if (!isValid) {
      return;
    }

    setIsSignUpPending(true);

    try {
      const createdUser = await signUp(payload);
      setCreatedEmail(createdUser.email);
      setFormSuccess(`회원가입 완료: ${createdUser.email}`);
      resetSignUpFormState();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "요청이 실패했습니다.";

      if (error?.code === "EMAIL_ALREADY_EXISTS" || error?.field === "email") {
        setSignUpErrors((prev) => ({
          ...prev,
          email: message,
        }));
      } else {
        setFormError(message);
      }
    } finally {
      setIsSignUpPending(false);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const { isValid, errors, payload } = validateLoginForm(loginForm);
    setLoginErrors(errors);

    if (!isValid) {
      return;
    }

    setIsLoginPending(true);

    try {
      const loggedInUser = await login(payload);
      setFormSuccess(`로그인 완료: ${loggedInUser.email}`);
      setLoginErrors(createEmptyLoginErrors());
      setLoginForm((prev) => ({
        ...prev,
        password: "",
      }));
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "요청이 실패했습니다.",
      );
    } finally {
      setIsLoginPending(false);
    }
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setFormError("");
    setFormSuccess("");
    resetSignUpFormState();
    resetLoginFormState();
  };

  const handleLogout = async () => {
    setFormError("");
    setIsLogoutPending(true);

    try {
      await logout();
      setFormSuccess("로그아웃 완료");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "요청이 실패했습니다.",
      );
    } finally {
      setIsLogoutPending(false);
    }
  };

  return {
    mode,
    formError,
    formSuccess,
    createdEmail,
    signUpForm,
    loginForm,
    signUpErrors,
    loginErrors,
    signUpMutation: { isPending: isSignUpPending },
    loginMutation: { isPending: isLoginPending },
    logoutMutation: { isPending: isLogoutPending },
    handleModeChange,
    handleLogout,
    handleSignUpInput,
    handleLoginInput,
    handleSignUpSubmit,
    handleLoginSubmit,
  };
}
