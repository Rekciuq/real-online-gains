import signupSchema from "@/schemas/auth/signup.schema";
import { z } from "zod";

export type SignupSchemaType = z.infer<typeof signupSchema>;
