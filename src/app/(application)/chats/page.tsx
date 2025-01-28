"use client";

import Message from "@/components/app/chat/Message";
import Header from "@/components/ui/Header";
import Loader from "@/components/ui/icons/Loader";
import { LOCAL_USER } from "@/constants/localStorageItems";
import { CHATS_ROUTE } from "@/constants/routes";
import { KEY_CHATS } from "@/constants/tanstackQueryKeys";
import { CHAT_PLACEHOLDER } from "@/constants/text/messages";
import ChatsClientService from "@/services/client/ChatsClientService";
import LocalStorageService from "@/services/client/LocalStorageService";
import ToastEmitter from "@/services/client/ToastEmitter";
import { CreateChat } from "@/types/common";
import { ChatRoom, User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const chatsService = new ChatsClientService();
const ChatsPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { data, error } = useQuery({
    queryKey: KEY_CHATS,
    queryFn: () => chatsService.getChats(),
  });

  const { mutate: createChat } = useMutation<ChatRoom, string, CreateChat>({
    mutationFn: (chat) => {
      return chatsService.createChat(chat);
    },
    onSuccess: (data) => {
      router.push(CHATS_ROUTE + `/${data?.id}`);
    },
    onError: (error) => {
      ToastEmitter.error(error);
    },
  });

  useEffect(() => {
    const user = LocalStorageService.getItem(LOCAL_USER);
    setUser(user);
    if (error) ToastEmitter.error(error as unknown as string);
  }, [error]);

  return (
    <div className="flex">
      <div className="p-4 flex flex-col gap-5 w-96 max-md:w-48">
        {data ? (
          <>
            {data.length ? (
              data.map((item) => (
                <Link
                  onClick={(event) => {
                    if (!item?.chatRoom) {
                      createChat({
                        userId: user!.id,
                        trainerId: item?.user?.id,
                      });
                      event.preventDefault();
                      event.stopPropagation();
                    }
                  }}
                  key={item?.user?.id + item?.image?.url + item?.image?.id}
                  href={CHATS_ROUTE + `/${item?.chatRoom?.id}`}
                >
                  <Message
                    headerContainerClassname="w-96 max-md:w-48"
                    userName={
                      item?.user?.firstName ||
                      item?.user?.lastName ||
                      item?.user?.email
                    }
                    createdAt={
                      item?.latestMessage
                        ? new Date(item.latestMessage.createdAt)
                        : undefined
                    }
                    imageSrc={item?.image?.url}
                    messageText={item?.latestMessage?.content}
                  />
                </Link>
              ))
            ) : (
              <Header className="text-2xl">{CHAT_PLACEHOLDER}</Header>
            )}
          </>
        ) : (
          <div className="flex w-full items-center justify-center">
            <Loader className="w-20 text-center text-emerald-300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
