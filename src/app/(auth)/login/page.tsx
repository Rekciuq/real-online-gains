"use client";

import { POST } from "@/constants/api/http-methods";
import {
  PERMISSION_TYPES_ROUTE,
  PERMISSIONS_ROUTE,
  ROLES_ROUTE,
  USERS_ROUTE,
} from "@/constants/api/routes";
import { handlePromiseClient } from "@/utils/handlePromiseClient";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    const getUsers = async () => {
      // const [error, response] = await handlePromiseClient(fetch(USERS_ROUTE));
      // if (error) {
      //   console.log(error);
      // }
      // console.log("response", response);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const [createUserError, createUserResponse] = await handlePromiseClient(
        fetch(USERS_ROUTE, {
          method: POST,
          body: JSON.stringify({ name: "fuck you" }),
          headers: myHeaders,
        }),
      );
      console.log("createUserError", createUserError);
      console.log("createUserResponse", createUserResponse);

      // const [rolesError, rolesResponse] = await handlePromiseClient(
      //   fetch(ROLES_ROUTE),
      // );
      // if (rolesError) {
      //   console.log(rolesError);
      // }
      // console.log("rolesResponse", rolesResponse);
      //
      // const [permissionsError, permissionsResponse] = await handlePromiseClient(
      //   fetch(PERMISSIONS_ROUTE),
      // );
      // if (permissionsError) {
      //   console.log(permissionsError);
      // }
      // console.log("permissionsResponse", permissionsResponse);
      //
      // const [permissionTypesError, permissionTypesResponse] =
      //   await handlePromiseClient(fetch(PERMISSION_TYPES_ROUTE));
      // if (permissionTypesError) {
      //   console.log(permissionTypesError);
      // }
      // console.log("permissionTypesResponse", permissionTypesResponse);
    };

    getUsers();
  }, []);
  return <div></div>;
};

export default LoginPage;
