import { UserService } from "@/services/UserService";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations();
  const [error] = await UserService.createUser({
    name: "damn1",
    email: "thing1",
  });

  return <p>{t(error!.message, error!.options) || "Hello world!"}</p>;
}
