import { Image, User } from "@prisma/client";
import { ComponentPropsWithoutRef } from "react";

export type InputsTypeProps = ComponentPropsWithoutRef<"input"> & {
  id: string;
  className?: string;
};

export type UserWithImage = User & { image: Image };
