"use client";

import { useMutation } from "@tanstack/react-query";
import UserService from "@/services/client/UserService";
import { TOAST_MESSAGE_SUCCESS_SIGNUP } from "@/constants/toastMessages/success";
import ImageUploadClientService from "@/services/client/ImageUploadClientService";
import ImageClientService from "@/services/client/ImageClientService";
import ToastEmitter from "@/services/client/ToastEmitter";
import Form from "@/components/ui/form/Form";
import InputGroup from "@/components/ui/form/inputs/InputGroup";
import Header from "@/components/ui/Header";
import { FORM_DATA_KEY_IMAGE } from "@/constants/formDataKeys";
import { LOCAL_IMAGE, LOCAL_USER } from "@/constants/localStorageItems";
import { LOGIN_ROUTE } from "@/constants/routes";
import { BUTTON_UDATE_PROFILE_TEXT } from "@/constants/text/buttons";
import { PROFILE_HEADER } from "@/constants/text/header";
import editProfileSchema from "@/schemas/profile/editProfile.schema";
import LocalStorageService from "@/services/client/LocalStorageService";
import { EditProfileType } from "@/types/schemas";
import { Image, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/icons/Loader";

const userService = new UserService();
const imageUploadClientService = new ImageUploadClientService();
const imageClientService = new ImageClientService();
const ProfilePage = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [imageData, setImageData] = useState<Image | null>(null);
  const [oldImage, setOldImage] = useState<Image | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = LocalStorageService.getItem(LOCAL_USER);
    const image = LocalStorageService.getItem(LOCAL_IMAGE);
    if (!user || !image) {
      router.push(LOGIN_ROUTE);
    }

    setUserData(user);
    setImageData(image);
    setOldImage(image);
  }, [router]);

  const { isPending, mutate: updateUser } = useMutation<
    User,
    string,
    EditProfileType
  >({
    mutationFn: (user) => {
      return userService.updateUser(user);
    },
    onSuccess: (data) => {
      if (data.imageId !== oldImage!.id) {
        deleteImage(oldImage!.id);
      }

      LocalStorageService.setItem(LOCAL_USER, { ...data });
      ToastEmitter.success(TOAST_MESSAGE_SUCCESS_SIGNUP);
    },
    onError: (error) => {
      deleteImage(userData!.imageId);
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
      setImageData(image);
      LocalStorageService.setItem(LOCAL_IMAGE, { ...image });
      const buf: User = { ...userData!, imageId: image.id };
      updateUser(buf);
    },
  });

  const { isPending: isImageDelitionPending, mutate: deleteImage } =
    useMutation<Image, string, number>({
      mutationFn: (imageId) => imageClientService.deleteImage(imageId),
    });

  const handleSubmit = async (fieldValues: EditProfileType) => {
    const { firstName, lastName, bio, gender, birthDate, profileImage, email } =
      fieldValues;
    const formData = new FormData();
    formData.append(
      FORM_DATA_KEY_IMAGE,
      new Blob([profileImage[0]], { type: profileImage[0].type }),
    );

    const date = birthDate ? birthDate : null;

    const newUser: User = {
      id: userData!.id,
      firstName: firstName ?? userData?.firstName ?? null,
      lastName: lastName ?? userData?.lastName ?? null,
      bio: bio ?? userData?.bio ?? null,
      gender: gender ?? userData?.gender ?? null,
      isBlocked: userData?.isBlocked ?? false,
      roleId: userData!.roleId,
      birthDate: date ? new Date(date) : null,
      password: userData!.password,
      email: email ?? userData!.email,
      imageId: userData!.imageId,
    };

    setUserData(newUser);

    if (profileImage[0].name !== oldImage!.url.split("/").at(-1)) {
      createImage(formData);
    } else {
      updateUser(newUser);
    }
  };

  const convertUserToDefaultValues = () => {
    const formattedDate = userData?.birthDate
      ? new Date(userData.birthDate).toISOString().split("T")[0]
      : null;

    const convertedData: EditProfileType = {
      firstName: userData?.firstName ?? "",
      lastName: userData?.lastName ?? "",
      email: userData?.email ?? "",
      bio: userData?.bio ?? null,
      gender: userData?.gender ?? "",
      birthDate: formattedDate ?? null,
      profileImage: imageData?.url,
    };
    return convertedData;
  };

  return (
    <div>
      <Header>{PROFILE_HEADER}</Header>
      {!!userData && !!imageData ? (
        <Form
          defaultValues={convertUserToDefaultValues()}
          handleSubmit={handleSubmit}
          schema={editProfileSchema}
        >
          <InputGroup>
            <InputGroup.Label
              htmlFor="profileImage"
              inputTitle="Profile Image"
            />
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
          <Form.Submit
            intent="submit"
            size="big"
            disabled={isPending || isImagePending || isImageDelitionPending}
          >
            {BUTTON_UDATE_PROFILE_TEXT}
          </Form.Submit>
        </Form>
      ) : (
        <div className="h-[662px] flex justify-center items-center">
          <Loader className="text-emerald-300 h-32 w-32" />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
