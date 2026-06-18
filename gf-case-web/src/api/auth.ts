import api from "./axios";
import type { LoginResponse, User } from "../types/auth";

export async function loginRequest(email: string, password: string) {
  return api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
}

export async function meRequest() {
  return api.get<User>("/auth/me");
}
