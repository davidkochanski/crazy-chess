import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/env";

export const REFRESH_PATH = "/auth/refresh";
const isSecure = NODE_ENV !== "development";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: isSecure,
};

// These two need to be functions since they rely on Date.now(), as in, when the function
// is invoked (when the user logs in etc.)
export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: new Date(Date.now() + 1000 * 60 * 15),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  path: REFRESH_PATH,
});

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};
export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

export const clearAuthCookies = (res: Response) =>
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: REFRESH_PATH });