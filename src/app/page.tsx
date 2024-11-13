import { UserService } from "@/services/UserService";

export default async function Home() {
  const response = await UserService.createUser({
    name: "damn1",
    email: "thing1",
  });
  // console.log(response);
  return <p>Hello world!</p>;
}
