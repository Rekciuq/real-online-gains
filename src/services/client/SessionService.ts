"use client";

import { SESSION_ROUTE } from "@/constants/api/routes";
import HttpService from "../HttpService";
import { LoginSchemaType } from "@/types/schemas";

class SessionService extends HttpService {
  constructor() {
    super(SESSION_ROUTE);
  }
  createSession = (data: LoginSchemaType) =>
    this.post<LoginSchemaType>({ data: data });
  updateSession = () => {};
  deleteSession = () => {};
}

export default SessionService;
