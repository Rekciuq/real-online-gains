import { FORM_DATA_KEY_IMAGE } from "@/constants/formDataKeys";
import { TOAST_MESSAGE_SUCCESS_UPDATE_PROFILE } from "@/constants/toastMessages/success";
import ImageClientService from "@/services/client/ImageClientService";
import ImageUploadClientService from "@/services/client/ImageUploadClientService";
import ToastEmitter from "@/services/client/ToastEmitter";
import UserService from "@/services/client/UserService";
import { UserWithImage } from "@/types/common";
import { EditProfileType } from "@/types/schemas";
import { User, Image } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import editProfileSchema from "@/schemas/profile/editProfile.schema";
import { BUTTON_UDATE_PROFILE_TEXT } from "@/constants/text/buttons";
import InputGroup from "../form/inputs/InputGroup";
import Form from "../form/Form";

type UpdateUserModalProps = {
  user: UserWithImage;
  setShow: Dispatch<SetStateAction<boolean>>;
  reloadUsers: () => void;
};

const userService = new UserService();
const imageUploadClientService = new ImageUploadClientService();
const imageClientService = new ImageClientService();
const UpdateUserModal = ({
  user,
  setShow,
  reloadUsers,
}: UpdateUserModalProps) => {
  const [userData, setUserData] = useState<User | null>(user);

  const { isPending, mutate: updateUser } = useMutation<
    User,
    string,
    EditProfileType
  >({
    mutationFn: (user) => {
      return userService.updateUser(user);
    },
    onSuccess: (data) => {
      if (data.imageId !== user.image.id) {
        deleteImage(user.image.id);
      }
      reloadUsers();
      setShow(false);
      ToastEmitter.success(TOAST_MESSAGE_SUCCESS_UPDATE_PROFILE);
    },
    onError: (error) => {
      deleteImage(user.imageId);
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
      id: user!.id,
      firstName: firstName ?? user?.firstName ?? null,
      lastName: lastName ?? user?.lastName ?? null,
      bio: bio ?? user?.bio ?? null,
      gender: gender ?? user?.gender ?? null,
      isBlocked: user?.isBlocked ?? false,
      roleId: user!.roleId,
      birthDate: date ? new Date(date) : null,
      password: user!.password,
      email: email ?? user!.email,
      imageId: user!.imageId,
    };

    setUserData(newUser);

    if (profileImage[0].name !== user.image.url.split("/").at(-1)) {
      createImage(formData);
    } else {
      updateUser(newUser);
    }
  };

  const convertUserToDefaultValues = () => {
    const formattedDate = user?.birthDate
      ? new Date(user.birthDate).toISOString().split("T")[0]
      : null;

    const convertedData: EditProfileType = {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      bio: user?.bio ?? null,
      gender: user?.gender ?? "",
      birthDate: formattedDate ?? null,
      profileImage: user.image.url,
    };
    return convertedData;
  };

  return (
    <div>
      <Form
        defaultValues={convertUserToDefaultValues()}
        handleSubmit={handleSubmit}
        schema={editProfileSchema}
      >
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
        <Form.Submit
          intent="submit"
          size="big"
          disabled={isPending || isImagePending || isImageDelitionPending}
        >
          {BUTTON_UDATE_PROFILE_TEXT}
        </Form.Submit>
      </Form>
    </div>
  );
};

export default UpdateUserModal;
