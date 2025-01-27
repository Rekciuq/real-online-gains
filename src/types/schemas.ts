import loginSchema from "@/schemas/auth/login.schema";
import signupSchema from "@/schemas/auth/signup.schema";
import editProfileSchema from "@/schemas/profile/editProfile.schema";
import { z } from "zod";

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type EditProfileType = z.infer<typeof editProfileSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
