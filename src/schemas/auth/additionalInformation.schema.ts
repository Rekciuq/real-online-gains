import { z } from "zod";
import imageSchema from "../files/image.schema";
import textInputSchema from "../common/textInput.schema";
import { MIN_TEXT_INPUT_LENGTH } from "@/constants/validation/length";

const additionalInformationSchema = z.object({
  firstName: textInputSchema.or(z.literal("")),
  lastName: textInputSchema.or(z.literal("")),
  bio: z.string().min(MIN_TEXT_INPUT_LENGTH).or(z.literal("")),
  gender: textInputSchema.or(z.literal("")),
  birthDate: z
    .string()
    .refine((stringDate) => new Date(stringDate))
    .or(z.literal("")),
  profileImage: imageSchema,
});

export default additionalInformationSchema;
