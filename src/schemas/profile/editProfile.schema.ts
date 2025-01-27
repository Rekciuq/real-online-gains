import additionalInformationSchema from "../auth/additionalInformation.schema";
import { z } from "zod";
import emailSchema from "../auth/email.schema";

const editProfileSchema = z
  .object({
    email: emailSchema,
  })
  .merge(additionalInformationSchema);

export default editProfileSchema;
