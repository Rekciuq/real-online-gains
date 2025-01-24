"use client";

import loginSchema from "@/schemas/auth/login.schema";
import Form from "../ui/form/Form";
import { LoginSchemaType } from "@/types/schemas";
import Header from "../ui/Header";
import InputGroup from "../ui/form/inputs/InputGroup";
import { LOGIN_HEADER } from "@/constants/text/header";
import { BUTTON_LOGIN_TEXT } from "@/constants/text/buttons";
import { useQuery } from "@tanstack/react-query";
import { KEY_LOGIN } from "@/constants/tanstackQueryKeys";
import { useState } from "react";
import SessionService from "@/services/client/SessionService";
import { useRouter } from "next/navigation";
import { DASHBOARD_PAGE } from "@/constants/pageRoutes";
import { TOAST_MESSAGE_SUCCESS_LOGIN } from "@/constants/toastMessages/success";
import useHandleResponseClient from "@/hooks/useHandleResponseClient.hook";

const sessionService = new SessionService();
const Login = () => {
  const router = useRouter();
  const [submittedData, setSubmittedData] = useState<LoginSchemaType | null>(
    null,
  );

  const { isLoading, data, error } = useQuery({
    queryKey: KEY_LOGIN,
    queryFn: () => submittedData && sessionService.createSession(submittedData),
    enabled: !!submittedData,
  });

  useHandleResponseClient({
    data,
    error,
    successMessage: TOAST_MESSAGE_SUCCESS_LOGIN,
    dataCb: () => router.push(DASHBOARD_PAGE),
  });

  const handleSubmit = (fieldValues: LoginSchemaType) => {
    setSubmittedData(fieldValues);
  };

  return (
    <Form schema={loginSchema} handleSubmit={handleSubmit}>
      <Header>{LOGIN_HEADER}</Header>
      <InputGroup>
        <InputGroup.Label htmlFor="email" inputTitle="Email" />
        <InputGroup.TextInput id="email" />
        <InputGroup.ErrorMessage inputName="email" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label htmlFor="password" inputTitle="Password" />
        <InputGroup.PasswordInput id="password" />
        <InputGroup.ErrorMessage inputName="password" />
      </InputGroup>
      <Form.Submit intent="submit" size="big" disabled={isLoading}>
        {BUTTON_LOGIN_TEXT}
      </Form.Submit>
    </Form>
  );
};

export default Login;
