import { MIN_TEXT_AREA_INPUT_LENGTH } from "@/constants/validation/length";
import { z } from "zod";

const sendMessageSchema = z.object({
  message: z.string().refine(
    (thing) => {
      if (thing.length > 1 && thing.length < MIN_TEXT_AREA_INPUT_LENGTH)
        return false;
      return true;
    },
    {
      message: `This field cannot be less than ${MIN_TEXT_AREA_INPUT_LENGTH}`,
    },
  ),
});

export default sendMessageSchema;
