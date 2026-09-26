import { request } from "./request.js";

export function signUp(payload) {
  return request("/auth/signup", {
    method: "POST",
    body: payload,
  });
}

export function login(payload) {
  return request("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function logout() {
  return request("/auth/logout", {
    method: "POST",
  });
}
