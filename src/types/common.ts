import { ComponentPropsWithoutRef } from "react";

export type InputsTypeProps = ComponentPropsWithoutRef<"input"> & {
  id: string;
  className?: string;
};
