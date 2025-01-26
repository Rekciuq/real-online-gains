"use client";

import signupSchema from "@/schemas/auth/signup.schema";
import Form from "../ui/form/Form";
import InputGroup from "../ui/form/inputs/InputGroup";
import { SignupSchemaType } from "@/types/schemas";
import { BUTTON_SIGNUP_TEXT } from "@/constants/text/buttons";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import UserService from "@/services/client/UserService";
import Header from "../ui/Header";
import { useRouter } from "next/navigation";
import { SIGNUP_HEADER } from "@/constants/text/header";
import { DB_TRAINER_ROLE, DB_USER_ROLE } from "@/constants/database";
import { TOAST_MESSAGE_SUCCESS_SIGNUP } from "@/constants/toastMessages/success";
import { LOGIN_ROUTE } from "@/constants/routes";
import ImageUploadClientService from "@/services/client/ImageUploadClientService";
import { FORM_DATA_KEY_IMAGE } from "@/constants/formDataKeys";
import ImageClientService from "@/services/client/ImageClientService";
import { User, Image } from "@prisma/client";
import ToastEmitter from "@/services/client/ToastEmitter";

const userService = new UserService();
const imageUploadClientService = new ImageUploadClientService();
const imageClientService = new ImageClientService();
const Signup = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<SignupSchemaType | null>(null);

  const { isPending, mutate: createUser } = useMutation<
    User,
    string,
    SignupSchemaType
  >({
    mutationFn: (user) => {
      setUserData({ ...user });
      return userService.createUser(user);
    },
    onSuccess: () => {
      ToastEmitter.success(TOAST_MESSAGE_SUCCESS_SIGNUP);
      router.push(LOGIN_ROUTE);
    },
    onError: (error) => {
      deleteImage(userData?.profileImage);
      ToastEmitter.error(error);
    },
  });

  const { isPending: isImagePending, mutate: createImage } = useMutation<
    { image: Image },
    string,
    FormData
  >({
    mutationFn: (imageFormData) =>
      imageUploadClientService.createImage(imageFormData),
    onSuccess: ({ image }) => {
      const buf: SignupSchemaType = { ...userData!, profileImage: image.id };
      createUser(buf);
    },
  });

  const { isPending: isImageDelitionPending, mutate: deleteImage } =
    useMutation<Image, string, number>({
      mutationFn: (imageId) => imageClientService.deleteImage(imageId),
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
    const formData = new FormData();
    formData.append(
      FORM_DATA_KEY_IMAGE,
      new Blob([profileImage[0]], { type: profileImage[0].type }),
    );
    createImage(formData);

    const newUser: SignupSchemaType = {
      firstName: firstName ?? null,
      lastName: lastName ?? null,
      bio: bio ?? null,
      gender: gender ?? null,
      birthDate: birthDate ?? null,
      ...restFields,
    };

    setUserData(newUser);
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
        disabled={isPending || isImagePending || isImageDelitionPending}
      >
        {BUTTON_SIGNUP_TEXT}
      </Form.Submit>
    </Form>
  );
};

export default Signup;
