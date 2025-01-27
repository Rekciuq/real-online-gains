import { Dispatch, SetStateAction } from "react";
import Button from "../Button";
import { UserWithImage } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import ImageClientService from "@/services/client/ImageClientService";
import UserService from "@/services/client/UserService";
import { User, Image } from "@prisma/client";
import ToastEmitter from "@/services/client/ToastEmitter";
import { TOAST_MESSAGE_SUCCESS_DELETE_USER } from "@/constants/toastMessages/success";
import {
  MODAL_WINDOW_ACTION_CONSENT,
  MODAL_WINDOW_ACTION_DO_NOT,
  MODAL_WINDOW_DELETE_QUESTION,
} from "@/constants/modalWindow/actions";

type DeleteUserModalProps = {
  setShow: Dispatch<SetStateAction<boolean>>;
  user: UserWithImage;
  reloadUsers: () => void;
};

const userService = new UserService();
const imageClientService = new ImageClientService();
const DeleteUserModal = ({
  setShow,
  user,
  reloadUsers,
}: DeleteUserModalProps) => {
  const { isPending, mutate: deleteUser } = useMutation<User, string, number>({
    mutationFn: (userId) => userService.deleteUser(userId),
    onSuccess: () => {
      deleteImage(user.imageId);
    },
  });

  const { isPending: isImageDelitionPending, mutate: deleteImage } =
    useMutation<Image, string, number>({
      mutationFn: (imageId) => imageClientService.deleteImage(imageId),
      onSuccess: () => {
        ToastEmitter.success(TOAST_MESSAGE_SUCCESS_DELETE_USER);
        reloadUsers();
        setShow(false);
      },
      onError: (error) => ToastEmitter.error(error),
    });

  const handleDeletion = () => {
    deleteUser(user.id);
  };
  return (
    <div className="flex flex-col text-start w-full mt-10">
      <p>{MODAL_WINDOW_DELETE_QUESTION}</p>
      <div className="w-full border-b border-b-emerald-300 mt-2 opacity-30"></div>
      <div className="mt-10 h-10 flex justify-end gap-5">
        <Button
          onClick={() => setShow(false)}
          disabled={isPending || isImageDelitionPending}
          intent="danger"
          size="big"
        >
          {MODAL_WINDOW_ACTION_DO_NOT}
        </Button>
        <Button
          onClick={handleDeletion}
          disabled={isPending || isImageDelitionPending}
          intent="submit"
          size="big"
        >
          {MODAL_WINDOW_ACTION_CONSENT}
        </Button>
      </div>
    </div>
  );
};

export default DeleteUserModal;
