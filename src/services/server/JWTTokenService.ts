"use server";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN,
  REFRESH_TOKEN_LIFETIME,
} from "@/constants/api/jwt";
import { TOKEN_TYPE } from "@/types/jwt";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

class JWTTokenService {
  private accessTokenSecret: string;
  private refreshTokenSecret: string;

  constructor() {
    this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET_KEY!;
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET_KEY!;
  }

  private generateToken = (
    userId: number,
    roleId: number,
    type: TOKEN_TYPE,
    expiresIn: string,
  ) => {
    return jwt.sign(
      { userId: userId, roleId: roleId },
      type === "access" ? this.accessTokenSecret : this.refreshTokenSecret,
      { expiresIn: expiresIn },
    );
  };

  generateTokens = (userId: number, roleId: number) => {
    const accessToken = this.generateToken(
      userId,
      roleId,
      ACCESS_TOKEN,
      ACCESS_TOKEN_LIFETIME,
    );

    const refreshToken = this.generateToken(
      userId,
      roleId,
      REFRESH_TOKEN,
      REFRESH_TOKEN_LIFETIME,
    );

    return {
      accessToken,
      refreshToken,
    };
  };

  verifyToken = async (token: string, tokenType: TOKEN_TYPE): Promise<any> => {
    try {
      const verifiedToken = await jwtVerify(
        token,
        tokenType === ACCESS_TOKEN
          ? new TextEncoder().encode(this.accessTokenSecret)
          : new TextEncoder().encode(this.refreshTokenSecret),
      );

      return [null, verifiedToken];
    } catch (error) {
      return [error, null];
    }
  };
}

export default JWTTokenService;
