"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/card/Card";
import Header from "@/components/ui/Header";
import Loader from "@/components/ui/icons/Loader";
import Img from "@/components/ui/Img";
import CreateUserModal from "@/components/ui/modalWindow/CreateUserModal";
import ModalWindow from "@/components/ui/modalWindow/ModalWindow";
import UpdateUserModal from "@/components/ui/modalWindow/UpdateUserModal";
import { DB_ROLES } from "@/constants/database";
import {
  MODAL_WINDOW_CREATE_HEADER,
  MODAL_WINDOW_DELETION_HEADER,
  MODAL_WINDOW_UPDATE_HEADER,
} from "@/constants/modalWindow/actions";
import { KEY_USERS } from "@/constants/tanstackQueryKeys";
import {
  BUTTON_CREATE_TEXT,
  BUTTON_DELETE_TEXT,
  BUTTON_UPDATE_TEXT,
} from "@/constants/text/buttons";
import { ADMIN_DASHBOARD_HEADER } from "@/constants/text/header";
import UserService from "@/services/client/UserService";
import { UserWithImage } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalWindowType = "delete" | "update" | "create" | "";
const modalWindowTypeObj: Record<Exclude<ModalWindowType, "">, string> = {
  delete: MODAL_WINDOW_DELETION_HEADER,
  update: MODAL_WINDOW_UPDATE_HEADER,
  create: MODAL_WINDOW_CREATE_HEADER,
};

const userService = new UserService();
const AdminDashboardPage = () => {
  const [reloadUsers, setReloadUsers] = useState(true);
  const [users, setUsers] = useState<UserWithImage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserWithImage | null>(null);
  const [modalType, setModalType] = useState<ModalWindowType>("");

  const { data } = useQuery({
    queryKey: KEY_USERS,
    queryFn: () => userService.getAll(),
    enabled: reloadUsers,
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
      setReloadUsers(false);
    }
  }, [data]);

  const showModalWindow = (
    user: UserWithImage | null,
    modalWindowType: ModalWindowType,
  ) => {
    if (user) {
      setCurrentUser(user);
    }
    setModalType(modalWindowType);
    setShowModal(true);
  };

  const handleUserChange = () => {
    setReloadUsers(true);
  };

  return (
    <div className="pb-10 px-5 max-md:max-w-[380px] max-w-[730px]">
      <Header className="mb-5">{ADMIN_DASHBOARD_HEADER}</Header>
      <Button
        onClick={() => showModalWindow(null, "create")}
        intent="submit"
        size="big"
        className="mb-10"
      >
        {BUTTON_CREATE_TEXT}
      </Button>
      {!!users.length ? (
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10">
          {users.map((user, index) => (
            <Card key={`${user.id} ${index}`} className="flex flex-col">
              <Img
                src={user.image.url}
                alt="Profile Image"
                containerClassName="w-32 h-32"
              />
              <div className="grid grid-cols-[_minmax(20px,_1fr)] gap-2 p-5">
                <p className="text-emerald-500 font-semibold">Email</p>
                <p>{user.email}</p>
                <p className="text-emerald-500 font-semibold">Bio</p>
                <p>{user.bio}</p>
                <p className="text-emerald-500 font-semibold">Gender</p>
                <p>{user.gender}</p>
                <p className="text-emerald-500 font-semibold">Birth date</p>
                <p>
                  {user.birthDate &&
                    new Date(user.birthDate).toISOString().split("T")[0]}
                </p>
                <p className="text-emerald-500 font-semibold">Role</p>
                <p className="font-semibold">
                  {DB_ROLES[user.roleId as keyof typeof DB_ROLES]}
                </p>
              </div>
              <div className="flex justify-between w-full gap-5">
                <Button
                  onClick={() => showModalWindow(user, "delete")}
                  intent="danger"
                  size="big"
                  className="h-10"
                >
                  {BUTTON_DELETE_TEXT}
                </Button>
                <Button
                  onClick={() => showModalWindow(user, "update")}
                  intent="submit"
                  size="big"
                  className="h-10"
                >
                  {BUTTON_UPDATE_TEXT}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="max-md:w-[380px] flex justify-center items-center">
          <Loader className="text-emerald-300 h-20 w-20" />
        </div>
      )}
      {showModal &&
        createPortal(
          <ModalWindow setShow={setShowModal}>
            <ModalWindow.Header onClick={() => setShowModal(false)}>
              {modalType && modalWindowTypeObj[modalType]}
            </ModalWindow.Header>
            {modalType === "delete" && currentUser && (
              <ModalWindow.DeleteUserModal
                user={currentUser}
                setShow={setShowModal}
                reloadUsers={handleUserChange}
              />
            )}
            {modalType === "update" && currentUser && (
              <UpdateUserModal
                reloadUsers={handleUserChange}
                user={currentUser}
                setShow={setShowModal}
              />
            )}
            {modalType === "create" && (
              <CreateUserModal
                reloadUsers={handleUserChange}
                setShow={setShowModal}
              />
            )}
          </ModalWindow>,
          document.body,
        )}
    </div>
  );
};

export default AdminDashboardPage;
