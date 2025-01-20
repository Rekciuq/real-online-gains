import { IMAGE_PREFIX } from "@/constants/imageTypes";
import {
  IMAGE_IS_REQUIRED,
  IMAGE_IS_TOO_BIG,
  NOT_AN_IMAGE,
} from "@/constants/validation/messages/auth";
import { MAX_IMAGE_SIZE_IN_MEGA_BYTES } from "@/constants/validation/sizes";
import { z } from "zod";

const imageSchema =
  typeof window === "undefined"
    ? z.any()
    : z
        .instanceof(FileList)
        .refine((file) => !!file.length, { message: IMAGE_IS_REQUIRED })
        .transform((fileList) => fileList[0])
        .refine(
          (file) => file instanceof File && file.type.startsWith(IMAGE_PREFIX),
          {
            message: NOT_AN_IMAGE,
          },
        )
        .refine(
          (file) =>
            file instanceof File && file.size <= MAX_IMAGE_SIZE_IN_MEGA_BYTES,
          {
            message: IMAGE_IS_TOO_BIG,
          },
        );

export default imageSchema;
