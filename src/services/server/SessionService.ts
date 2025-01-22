import prisma from "@/lib/prisma";

class SessionService {
  static createSession = async (refreshToken: string, userId: number) => {
    try {
      const response = await prisma.session.create({
        data: {
          refreshToken,
          userId,
        },
      });
      return [null, response];
    } catch (error) {
      return [error, null];
    }
  };

  static updateSession = async (
    oldRefreshToken: string,
    newRefreshToken: string,
    userId: number,
  ) => {
    try {
      const response = await prisma.session.delete({
        where: { refreshToken: oldRefreshToken },
      });

      await this.createSession(newRefreshToken, userId);
      return [null, response];
    } catch (error) {
      return [error, null];
    }
  };

  static deleteSession = async (refreshToken: string) => {
    try {
      const response = await prisma.session.delete({
        where: { refreshToken: refreshToken },
      });
      return [null, response];
    } catch (error) {
      return [error, null];
    }
  };
}

export default SessionService;
