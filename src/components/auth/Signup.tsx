"use client";

import signupSchema from "@/schemas/auth/signup.schema";
import Form from "../ui/form/Form";
import InputGroup from "../ui/form/inputs/InputGroup";
import { LoginSchemaType, SignupSchemaType } from "@/types/schemas";
import { BUTTON_SIGNUP_TEXT } from "@/constants/text/buttons";
import { KEY_CREATE_USER, KEY_LOGIN } from "@/constants/tanstackQueryKeys";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import UserService from "@/services/client/UserService";
import Header from "../ui/Header";
import { useRouter } from "next/navigation";
import { SIGNUP_HEADER } from "@/constants/text/header";
import { LOGIN_ROUTE } from "@/constants/routes";
import { TOAST_MESSAGE_SUCCESS_SIGNUP } from "@/constants/toastMessages/success";
import useHandleResponseClient from "@/hooks/useHandleResponseClient.hook";
import { DB_TRAINER_ROLE, DB_USER_ROLE } from "@/constants/database";
import SessionService from "@/services/client/SessionService";
import loginSchema from "@/schemas/auth/login.schema";

const convertFromFileToBase64 = async (file: File): Promise<string> => {
  const arrayBuffer = new Uint8Array(await file.arrayBuffer());
  let binaryString = "";

  const CHUNK_SIZE = 64 * 1024;
  for (let i = 0; i < arrayBuffer.length; i += CHUNK_SIZE) {
    const chunk = arrayBuffer.slice(i, i + CHUNK_SIZE);
    binaryString += String.fromCharCode(...chunk);
  }

  return btoa(binaryString);
};

const userService = new UserService();
const sessionService = new SessionService();
const Signup = () => {
  const router = useRouter();
  const [submittedData, setSubmittedData] = useState<SignupSchemaType | null>(
    null,
  );
  const [loggingData, setLoggingData] = useState<LoginSchemaType | null>(null);

  const { isLoading, data, error } = useQuery({
    queryKey: KEY_CREATE_USER,
    queryFn: () => submittedData && userService.createUser(submittedData),
    enabled: !!submittedData,
  });

  const {
    isLoading: isSigninLoading,
    data: singinData,
    error: singingError,
  } = useQuery({
    queryKey: KEY_LOGIN,
    queryFn: () => loggingData && sessionService.createSession(loggingData),
    enabled: !!loggingData,
  });

  useHandleResponseClient({
    data,
    error,
  });

  useEffect(() => {
    if (!submittedData) {
      return;
    }

    const { email, password } = submittedData;
    const requiredData = loginSchema.safeParse({ email, password });

    if (requiredData.data) {
      setLoggingData(requiredData.data);
    }
    router.push(LOGIN_ROUTE);
  }, [router, submittedData]);

  useHandleResponseClient({
    data: singinData,
    error: singingError,
    successMessage: TOAST_MESSAGE_SUCCESS_SIGNUP,
  });

  const handleSubmit = async (fieldValues: SignupSchemaType) => {
    const {
      firstName,
      lastName,
      bio,
      gender,
      birthDate,
      profileImage,
      ...restFields
    } = fieldValues;
    const file = await convertFromFileToBase64(profileImage[0]);

    const newUser: SignupSchemaType = {
      firstName: firstName ?? null,
      lastName: lastName ?? null,
      bio: bio ?? null,
      gender: gender ?? null,
      birthDate: birthDate ?? null,
      profileImage: file,
      ...restFields,
    };

    setSubmittedData(newUser);
  };
  return (
    <Form schema={signupSchema} handleSubmit={handleSubmit}>
      <Header>{SIGNUP_HEADER}</Header>
      <InputGroup>
        <InputGroup.Label htmlFor="profileImage" inputTitle="Profile Image" />
        <InputGroup.ImageInput id="profileImage" />
        <InputGroup.ErrorMessage inputName="profileImage" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label htmlFor="email" inputTitle="Email" />
        <InputGroup.TextInput id="email" />
        <InputGroup.ErrorMessage inputName="email" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label
          htmlFor="firstName"
          inputTitle="First Name (optional)"
        />
        <InputGroup.TextInput id="firstName" />
        <InputGroup.ErrorMessage inputName="firstName" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label
          htmlFor="lastName"
          inputTitle="Last Name (optional)"
        />
        <InputGroup.TextInput id="lastName" />
        <InputGroup.ErrorMessage inputName="lastName" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label htmlFor="gender" inputTitle="Gender (Optional)" />
        <InputGroup.TextInput id="gender" />
        <InputGroup.ErrorMessage inputName="gender" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label
          htmlFor="birthDate"
          inputTitle="Birth Date (Optional)"
        />
        <InputGroup.DateInput id="birthDate" />
        <InputGroup.ErrorMessage inputName="birthDate" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label htmlFor="bio" inputTitle="Bio (Optional)" />
        <InputGroup.TextArea id="bio" />
        <InputGroup.ErrorMessage inputName="bio" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label htmlFor="role" inputTitle="I want to be:" />
        <div className="my-2">
          <div className="grid grid-cols-2 gap-3">
            <InputGroup.Label htmlFor="" inputTitle="An user:" />
            <InputGroup.RadioInput
              id="role"
              className="self-end place-self-end"
              value={DB_USER_ROLE.toString()}
            />
            <InputGroup.Label htmlFor="" inputTitle="A Trainer:" />
            <InputGroup.RadioInput
              id="role"
              className="self-end place-self-end"
              value={DB_TRAINER_ROLE.toString()}
            />
          </div>
        </div>
        <InputGroup.ErrorMessage inputName="role" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label htmlFor="password" inputTitle="Password" />
        <InputGroup.PasswordInput id="password" />
        <InputGroup.ErrorMessage inputName="password" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label
          htmlFor="confirmPassword"
          inputTitle="Confirm Password"
        />
        <InputGroup.PasswordInput id="confirmPassword" />
        <InputGroup.ErrorMessage inputName="confirmPassword" />
      </InputGroup>

      <Form.Submit
        intent="submit"
        size="big"
        disabled={isLoading || isSigninLoading}
      >
        {BUTTON_SIGNUP_TEXT}
      </Form.Submit>
    </Form>
  );
};

export default Signup;
