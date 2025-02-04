import { MAX_TEXT_INPUT_LENGTH, MIN_TEXT_INPUT_LENGTH } from "../length";
import { MAX_IMAGE_SIZE_FORMATTED } from "../sizes";

export const NOT_AN_IMAGE = "Unsupported file type. Only Images are allowed.";
export const IMAGE_IS_TOO_BIG = `File size must be less than ${MAX_IMAGE_SIZE_FORMATTED} MB.`;
export const PASSWORDS_DONT_MATCH = "Passwords must match.";
export const IMAGE_IS_REQUIRED = "Image is required!";
export const ROLE_IS_REQUIRED = "This field is required!";
export const FIELD_MORE_THAN_MAX = `This field cannot be less than ${MAX_TEXT_INPUT_LENGTH}`;
export const FIELD_LESS_THAN_MIN = `This field cannot be less than ${MIN_TEXT_INPUT_LENGTH}`;
