import {
  MAX_TEXT_INPUT_LENGTH,
  MIN_TEXT_INPUT_LENGTH,
} from "@/constants/validation/length";
import {
  FIELD_LESS_THAN_MIN,
  FIELD_MORE_THAN_MAX,
} from "@/constants/validation/messages/auth";
import { z } from "zod";

const textInputSchema = z
  .string()
  .refine(
    (thing) => {
      if (thing.length > 1 && thing.length < MIN_TEXT_INPUT_LENGTH)
        return false;
      return true;
    },
    { message: FIELD_LESS_THAN_MIN },
  )
  .refine(
    (thing) => {
      if (thing.length > 1 && thing.length > MAX_TEXT_INPUT_LENGTH)
        return false;
      return true;
    },
    { message: FIELD_MORE_THAN_MAX },
  );

export default textInputSchema;
