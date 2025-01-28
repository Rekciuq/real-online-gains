import { ChatRoom, Image, Message, User } from "@prisma/client";
import { ComponentPropsWithoutRef } from "react";

export type InputsTypeProps = ComponentPropsWithoutRef<"input"> & {
  id: string;
  className?: string;
};

export type UserWithImage = User & { image: Image };

export type ChatUser = {
  user: User;
  image: Image;
  chatRoom: ChatRoom;
  latestMessage: Message | null;
};
export type CreateChat = {
  userId: number;
  trainerId: number;
};
