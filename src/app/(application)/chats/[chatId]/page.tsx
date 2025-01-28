"use client";
import Message from "@/components/app/chat/Message";
import Form from "@/components/ui/form/Form";
import InputGroup from "@/components/ui/form/inputs/InputGroup";
import { BUTTON_SEND_MESSAGE } from "@/constants/text/buttons";
import sendMessageSchema from "@/schemas/chats/sendMessage.schema";
import { SendMessageSchemaType } from "@/types/schemas";

const ChatPage = (params) => {
  const handleSubmit = (thing: SendMessageSchemaType) => {};
  return (
    <div className="w-[1150px]">
      <div className="h-[500px] overflow-auto border-b-emerald-200 border-b border-opacity-70">
        {Array.from({ length: 13 }).map((_, index) => (
          <Message
            key={index * 105}
            userName={""}
            imageSrc={""}
            createdAt={new Date()}
          />
        ))}
      </div>
      <Form handleSubmit={handleSubmit} schema={sendMessageSchema}>
        <InputGroup>
          <InputGroup.TextArea
            className="resize-none"
            id="message"
            placeholder="Write message..."
          />
        </InputGroup>
        <Form.Submit intent="submit" size="big">
          {BUTTON_SEND_MESSAGE}
        </Form.Submit>
      </Form>
    </div>
  );
};

export default ChatPage;
