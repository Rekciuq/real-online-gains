import prisma from "@/lib/prisma";
import { handlePromiseServer } from "@/utils/handlePromiseServer";

class SessionService {
  static createSession = async (refreshToken: string, userId: number) => {
    const [error, response] = await handlePromiseServer(() =>
      prisma.session.create({
        data: {
          refreshToken,
          userId,
        },
      }),
    );
    return { error, response };
  };

  static updateSession = async (
    oldRefreshToken: string,
    newRefreshToken: string,
    userId: number,
  ) => {
    const [error, response] = await handlePromiseServer(() =>
      prisma.session.delete({
        where: { refreshToken: oldRefreshToken },
      }),
    );

    const { error: createError } = await this.createSession(
      newRefreshToken,
      userId,
    );

    if (createError) {
      return { createError, response: null };
    }

    return { error, response };
  };

  static deleteSession = async (refreshToken: string) => {
    const [error, response] = await handlePromiseServer(() =>
      prisma.session.delete({
        where: { refreshToken: refreshToken },
      }),
    );

    return { error, response };
  };
}

export default SessionService;
