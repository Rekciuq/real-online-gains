"use client";

import loginSchema from "@/schemas/auth/login.schema";
import Form from "../ui/form/Form";
import { LoginSchemaType } from "@/types/schemas";
import Header from "../ui/Header";
import InputGroup from "../ui/form/inputs/InputGroup";
import { LOGIN_HEADER } from "@/constants/text/header";
import { BUTTON_LOGIN_TEXT } from "@/constants/text/buttons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { KEY_GET_IMAGE } from "@/constants/tanstackQueryKeys";
import { useEffect, useState } from "react";
import SessionService from "@/services/client/SessionService";
import { useRouter } from "next/navigation";
import { TOAST_MESSAGE_SUCCESS_LOGIN } from "@/constants/toastMessages/success";
import LocalStorageService from "@/services/client/LocalStorageService";
import { LOCAL_IMAGE, LOCAL_USER } from "@/constants/localStorageItems";
import { CHATS_ROUTE, LOGOUT_ROUTE } from "@/constants/routes";
import ImageClientService from "@/services/client/ImageClientService";
import { User } from "@prisma/client";
import ToastEmitter from "@/services/client/ToastEmitter";
import { TOAST_MESSAGE_ERROR_BLOCKED } from "@/constants/toastMessages/error";

const sessionService = new SessionService();
const imageClientService = new ImageClientService();
const Login = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [isUserSuccess, setIsUserSuccess] = useState(false);

  const {
    isPending,
    mutate: createSession,
    isSuccess,
  } = useMutation<User, string, LoginSchemaType>({
    mutationFn: (user) => {
      return sessionService.createSession(user);
    },
    onSuccess: (data) => {
      setUserData(data);
      setIsUserSuccess(true);
      LocalStorageService.setItem(LOCAL_USER, data);
    },
    onError: (error) => {
      ToastEmitter.error(error);
    },
  });

  const { isLoading: isImageLoading, data: imageData } = useQuery({
    queryKey: KEY_GET_IMAGE,
    queryFn: () => userData && imageClientService.getImage(userData.imageId),
    enabled: isUserSuccess,
  });

  useEffect(() => {
    if (imageData && isSuccess) {
      if (userData?.isBlocked) {
        ToastEmitter.error(TOAST_MESSAGE_ERROR_BLOCKED);
        router.push(LOGOUT_ROUTE);
        return;
      }

      LocalStorageService.setItem(LOCAL_IMAGE, imageData);
      ToastEmitter.success(TOAST_MESSAGE_SUCCESS_LOGIN);
      router.push(CHATS_ROUTE);
    }
  }, [imageData, isSuccess, router, userData?.isBlocked]);

  const handleSubmit = (fieldValues: LoginSchemaType) => {
    createSession(fieldValues);
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
      <Form.Submit
        intent="submit"
        size="big"
        disabled={isPending || isImageLoading}
      >
        {BUTTON_LOGIN_TEXT}
      </Form.Submit>
    </Form>
  );
};

export default Login;
