import Img from "@/components/ui/Img";
import { MESSAGE_PLACEHOLDER } from "@/constants/text/messages";
import DateService from "@/services/client/DateService";
import { ComponentPropsWithoutRef } from "react";

type MessageProps = ComponentPropsWithoutRef<"div"> & {
  userName: string;
  createdAt?: Date;
  messageText?: string;
  imageSrc: string;
};

const Message = ({
  userName,
  createdAt,
  messageText,
  imageSrc,
  ...props
}: MessageProps) => {
  return (
    <div
      className="flex flex-col gap-5 text-start hover:bg-emerald-50 select-none cursor-pointer rounded-md transition-colors p-2"
      {...props}
    >
      <div className="flex justify-between items-center w-96 max-md:w-48">
        <div className="flex gap-3 items-center w-full">
          <Img src={imageSrc} className="h-10 w-10" alt="Profile Picture" />
          <p>{userName}</p>
        </div>
        {createdAt ? <p>{DateService.formatFullDate(createdAt)}</p> : <></>}
      </div>
      <p>{messageText ? messageText : MESSAGE_PLACEHOLDER}</p>
    </div>
  );
};

export default Message;
