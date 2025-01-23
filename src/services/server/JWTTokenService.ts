import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN,
  REFRESH_TOKEN_LIFETIME,
} from "@/constants/api/jwt";
import { TOKEN_TYPE } from "@/types/jwt";
import jwt from "jsonwebtoken";

class JWTTokenService {
  private accessTokenSecret: string;
  private refreshTokenSecret: string;

  constructor() {
    this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET_KEY!;
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET_KEY!;
  }

  private generateToken = (
    userId: number,
    type: TOKEN_TYPE,
    expiresIn: string,
  ) => {
    return jwt.sign(
      { userId: userId },
      type === "access" ? this.accessTokenSecret : this.refreshTokenSecret,
      { expiresIn: expiresIn },
    );
  };

  generateTokens = (userId: number) => {
    const accessToken = this.generateToken(
      userId,
      ACCESS_TOKEN,
      ACCESS_TOKEN_LIFETIME,
    );

    const refreshToken = this.generateToken(
      userId,
      REFRESH_TOKEN,
      REFRESH_TOKEN_LIFETIME,
    );

    return {
      accessToken,
      refreshToken,
    };
  };

  verifyToken = (token: string, tokenType: TOKEN_TYPE) => {
    try {
      const decodedToken = jwt.decode(token, { complete: true });
      const expirationDate = new Date(decodedToken?.payload.exp * 1000);
      const currentDate = new Date();
      if (currentDate >= expirationDate) {
        return [{ message: "Token is expired" }, null];
      }
      const verifiedToken = jwt.verify(
        token,
        tokenType === ACCESS_TOKEN
          ? this.accessTokenSecret
          : this.refreshTokenSecret,
      );

      return [null, verifiedToken];
    } catch (error) {
      return [error, null];
    }
  };
}

export default JWTTokenService;
