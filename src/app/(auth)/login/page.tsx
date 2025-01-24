import Login from "@/components/auth/Login";
import { SIGNUP_ROUTE } from "@/constants/routes";
import Link from "next/link";

const LoginPage = () => (
  <>
    <Login />
    <Link href={SIGNUP_ROUTE}></Link>
  </>
);

export default LoginPage;
