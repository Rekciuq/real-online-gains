import { TranslationValues } from "next-intl"

export type BaseErrorType = {
  body: BaseErrorBodyType
  status: number
}
export type BaseErrorBodyType = {
  message: string,
  options?: TranslationValues
}
