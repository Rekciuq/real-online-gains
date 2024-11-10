import { EN_LOCALE } from "@/constants/i18n/locales"
import { getRequestConfig } from "next-intl/server"


export default getRequestConfig(async () => {
  const locale = EN_LOCALE

  return {
    locale,
    messages: (await import(`./messages/${locale.toLowerCase()}.json`))
      .default
  }
})
