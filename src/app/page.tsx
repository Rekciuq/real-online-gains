import { UserService } from "@/services/UserService";
import { getTranslations } from "next-intl/server";
import PrismaError from "@/services/errors/server/PrismaError";
import ErrorHandler from "@/services/errors/ErrorHandler";

const prismaError = new PrismaError();
export default async function Home() {
  const t = await getTranslations();
  const response = await UserService.createUser({
    name: "damn1",
    email: "thing1",
  });
  console.log(await response[1].json());
  // Make enum for codes, and enum for this enums
  return (
    <p>
      {t(ErrorHandler.getFullPath(prismaError, "P2002"), {
        property: "email",
      }) || "Hello world!"}
    </p>
  );
}
