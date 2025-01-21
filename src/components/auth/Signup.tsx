"use client";

import signupSchema from "@/schemas/auth/signup.schema";
import Form from "../ui/form/Form";
import InputGroup from "../ui/form/inputs/InputGroup";
import { SignupSchemaType } from "@/types/schemas";
import { BUTTON_SUBMIT_TEXT } from "@/constants/text/buttonsText";
import { KEY_CREATE_USER } from "@/constants/tanstackQueryKeys";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import UserService from "@/services/client/UserService";
import ToastEmitter from "@/services/client/ToastEmitter";
import Header from "../ui/Header";
import { useRouter } from "next/navigation";
import { DASHBOARD_PAGE } from "@/constants/pageRoutes";

// Make a server action form that function someday
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
const Signup = () => {
  const router = useRouter();
  const [submittedData, setSubmittedData] = useState<SignupSchemaType | null>(
    null,
  );
  const { isLoading, data, error } = useQuery({
    queryKey: KEY_CREATE_USER,
    queryFn: () => submittedData && userService.createUser(submittedData),
    enabled: !!submittedData,
  });

  useEffect(() => {
    if (data) {
      router.push(DASHBOARD_PAGE);
      ToastEmitter.success("Your registration was completed!");
    }
    if (error) {
      console.error(error);
      ToastEmitter.error(`Error! ${error}`);
    }
  }, [data, error, router]);

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
      <Header>{"Signup"}</Header>
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

      <Form.Submit intent="submit" size="big" disabled={isLoading}>
        {BUTTON_SUBMIT_TEXT}
      </Form.Submit>
    </Form>
  );
};

export default Signup;
