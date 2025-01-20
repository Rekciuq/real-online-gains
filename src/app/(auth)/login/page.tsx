"use client";

import { KEY_CREATE_USER, KEY_USER } from "@/constants/tanstackQueryKeys";
import { SeedUser } from "@/seed/types";
import UserService from "@/services/client/UserService";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const likeImage = new Uint8Array([255, 64, 12, 36]);

const newUser: SeedUser = {
  email: "thing@thing",
  password: "1234",
  profileImage: likeImage,
  isBlocked: false,
  roleId: 0,
  firstName: null,
  lastName: null,
  bio: null,
  gender: null,
  birthDate: null,
};

const userService = new UserService();
const LoginPage = () => {
  const [enableGetAllUsers, setEnableGetAllUsers] = useState(false);
  const [enableCreateUser, setEnableCreateUser] = useState(false);
  const {
    isPending: isPendingCreation,
    data: dataCreation,
    error: errorCreation,
    isFetching: isFetchingCreation,
  } = useQuery({
    queryKey: KEY_CREATE_USER,
    queryFn: () => userService.createUser(newUser),
    enabled: enableCreateUser,
  });

  const { isPending, isFetching, data, error } = useQuery<User[]>({
    queryKey: KEY_USER,
    queryFn: () => userService.getAll(),
    enabled: enableGetAllUsers,
  });
  console.log("data", data);
  console.log("dataCreation", dataCreation);
  // if (isPending) return <span>Loading...</span>;
  // if (error) return <div>{error.message}</div>;
  return (
    <div className="flex gap-10">
      <button onClick={() => setEnableCreateUser(!enableCreateUser)}>
        Create
      </button>
      <button onClick={() => setEnableGetAllUsers(!enableGetAllUsers)}>
        Show
      </button>
      {isPending && isFetching && <div>GEtting all the users</div>}
      {error && <div>{error.message}</div>}
      {isPendingCreation && isFetchingCreation && <div>Creating a user</div>}
      {errorCreation && <div>{errorCreation.message}</div>}
    </div>
  );
};

export default LoginPage;
