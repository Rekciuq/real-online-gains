import { CHATS_API_ROUTE } from "@/constants/api/routes";
import HttpService from "../HttpService";
import { ChatUser, CreateChat } from "@/types/common";
import { ChatRoom } from "@prisma/client";

class ChatsClientService extends HttpService {
  constructor() {
    super(CHATS_API_ROUTE);
  }
  createChat = (data: CreateChat): Promise<ChatRoom> =>
    this.post<CreateChat>({ data });
  getChats = () => this.get<ChatUser[]>({ url: "" });
  getChat = (id: ChatRoom["id"]) => this.get<ChatUser>({ url: `/${id}` });
}

export default ChatsClientService;
