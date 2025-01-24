import credentialsSchema from "./credentials.schema";
import additionalInformationSchema from "./additionalInformation.schema";
import {
  PASSWORDS_DONT_MATCH,
  ROLE_IS_REQUIRED,
} from "@/constants/validation/messages/auth";
import { z } from "zod";

const signupSchema = credentialsSchema
  .extend({
    confirmPassword: z.string(),
    role: z
      .enum(["2", "3"])
      .or(z.null())
      .refine((value) => value, { message: ROLE_IS_REQUIRED }),
  })
  .merge(additionalInformationSchema)
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: PASSWORDS_DONT_MATCH,
      });
    }
  });

export default signupSchema;
