import { z } from "zod";
import textInputSchema from "../common/textInput.schema";
import emailSchema from "./email.schema";

const credentialsSchema = z.object({
  email: emailSchema,
  password: textInputSchema,
});

export default credentialsSchema;
