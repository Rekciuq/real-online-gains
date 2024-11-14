import { UserService } from "@/services/UserService";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations();
  const response = await UserService.createUser({
    name: "damn1",
    email: "thing1",
  });
  return <p>{"Hello world!"}</p>;
}
