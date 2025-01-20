import {
  MAX_TEXT_INPUT_LENGTH,
  MIN_TEXT_INPUT_LENGTH,
} from "@/constants/validation/length";
import { z } from "zod";

const textInputSchema = z
  .string()
  .min(MIN_TEXT_INPUT_LENGTH)
  .max(MAX_TEXT_INPUT_LENGTH);

export default textInputSchema;
