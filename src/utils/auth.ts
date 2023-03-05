import { setCookie, getCookie } from "./cookie";

export const setCookies = ({
  accessToken,
  refreshToken,
} : {
  accessToken: string;
  refreshToken: string;
}) => {
  const expirationAt = new Date(new Date().getTime() + 20 * 60 * 1000);

  setCookie("accessToken", accessToken.split("Bearer ")[1], {
    expires: expirationAt,
  });
  setCookie("refreshToken", refreshToken);
};

export const authTokens = () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  return { accessToken, refreshToken };
};
