import { AuthResponseDto } from "@/shared/models/authentication/AuthResponseDto";
import { LoginRequestDto } from "@/shared/models/authentication/LoginRequestDto";
import agent from "../agent";
import { RegisterRequestDto } from "@/shared/models/authentication/RegisterRequestDto";

export const login = async (lrd: LoginRequestDto) => {
  return await agent.post<AuthResponseDto>("/Auth/login", lrd);
};

export const register = async (rrd: RegisterRequestDto) => {
  return await agent.post<AuthResponseDto>("/Auth/register", rrd);
};
