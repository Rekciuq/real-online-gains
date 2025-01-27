import { z } from "zod";
import imageSchema from "../files/image.schema";
import textInputSchema from "../common/textInput.schema";
import { MIN_TEXT_INPUT_LENGTH } from "@/constants/validation/length";

const additionalInformationSchema = z.object({
  firstName: textInputSchema
    .transform((thing) => {
      if (thing === "") return null;
      return thing;
    })
    .nullable(),
  lastName: textInputSchema
    .transform((thing) => {
      if (thing === "") return null;
      return thing;
    })
    .nullable(),
  bio: z
    .string()
    .refine(
      (thing) => {
        if (thing.length > 1 && thing.length < MIN_TEXT_INPUT_LENGTH)
          return false;
        return true;
      },
      { message: `This field cannot be less than ${MIN_TEXT_INPUT_LENGTH}` },
    )
    .optional()
    .transform((thing) => {
      if (thing === "" || !thing) return null;
      return thing;
    })
    .nullable(),
  gender: textInputSchema
    .transform((thing) => {
      if (thing === "") return null;
      return thing;
    })
    .nullable(),
  birthDate: z
    .string()
    .transform((thing) => {
      if (thing === "") return null;
      return thing;
    })
    .transform((stringDate) => {
      if (stringDate !== "" && stringDate !== null) {
        const date = new Date(stringDate);
        if (isNaN(date.getDate())) {
          return date;
        }
      }
      return null;
    })
    .or(z.string())
    .nullable(),
  profileImage: imageSchema,
});

export default additionalInformationSchema;
