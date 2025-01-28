import { DB_TRAINER_ROLE, DB_USER_ROLE } from "@/constants/database";
import prisma from "@/lib/prisma";
import { handlePromiseServer } from "@/utils/handlePromiseServer";

class MessageServerService {
  static getChats = async (userId: number, roleId: number) => {
    const [error, response] = await handlePromiseServer(async () => {
      const roleFilter =
        roleId === DB_USER_ROLE ? DB_TRAINER_ROLE : DB_USER_ROLE;

      const [, oppositeRoleUsers] = await handlePromiseServer(() =>
        prisma.user.findMany({
          where: {
            roleId: roleFilter,
          },
          include: {
            image: true,
            trainerChatRoom: {
              include: {
                trainer: true,
                user: true,
                UserMessages: {
                  include: {
                    message: true,
                  },
                  orderBy: {
                    message: {
                      createdAt: "desc",
                    },
                  },
                  take: 1,
                },
              },
            },
            UserChatRoom: {
              include: {
                trainer: true,
                user: true,
                UserMessages: {
                  include: {
                    message: true,
                  },
                  orderBy: {
                    message: {
                      createdAt: "desc",
                    },
                  },
                  take: 1,
                },
              },
            },
          },
        }),
      );

      const updatedUsers = await Promise.all(
        oppositeRoleUsers!.map(async (oppositeUser) => {
          const existingChatRoom =
            oppositeUser.UserChatRoom.find(
              (chatRoom) =>
                userId === chatRoom.userId || userId === chatRoom.trainerId,
            ) ||
            oppositeUser.trainerChatRoom.find(
              (chatRoom) =>
                userId === chatRoom.userId || userId === chatRoom.trainerId,
            );

          if (!existingChatRoom && roleId === DB_TRAINER_ROLE) {
            return null;
          }

          if (!existingChatRoom) {
            return {
              user: oppositeUser,
              image: oppositeUser.image,
              chatRoom: null,
              latestMessage: null,
            };
          }

          const latestMessage = existingChatRoom.UserMessages[0]?.message;

          return {
            user: oppositeUser,
            image: oppositeUser.image,
            chatRoom: existingChatRoom,
            latestMessage,
          };
        }),
      );

      if (updatedUsers.some((item) => item === null)) {
        return updatedUsers.filter((user) => user !== null);
      }

      return updatedUsers;
    });

    return { error, response };
  };

  static createChat = async (userId: number, trainerId: number) => {
    const [error, response] = await handlePromiseServer(() =>
      prisma.chatRoom.create({
        data: {
          userId,
          trainerId,
        },
      }),
    );

    return { error, response };
  };
}

export default MessageServerService;
