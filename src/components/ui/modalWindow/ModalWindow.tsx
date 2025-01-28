"use client";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  MouseEvent,
  useRef,
  KeyboardEvent,
} from "react";
import Card from "../card/Card";
import { cn } from "@/lib/utils";
import { ESCAPE_KEY } from "@/constants/keyboardKeys";
import ModalHeader from "./ModalHeader";
import DeleteUserModal from "./DeleteUserModal";

type ModalWindowProps = {
  className?: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const ModalWindow = ({ className, setShow, children }: ModalWindowProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalWindowId = "modalWindowId";

  useEffect(() => {
    if (modalRef?.current) {
      modalRef.current.focus();
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onEscUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ESCAPE_KEY) {
      setShow(false);
    }
  };

  const closeModal = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target.id === modalWindowId) {
      setShow(false);
    }
  };

  return (
    <div
      id={modalWindowId}
      className="fixed overflow-auto inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
      onKeyUp={onEscUp}
      ref={modalRef}
      tabIndex={-1}
    >
      <Card
        className={cn(
          "bg-white flex flex-col p-6 max-w-lg w-full transform shadow-emerald-400",
          className,
        )}
      >
        {children}
      </Card>
    </div>
  );
};

ModalWindow.Header = ModalHeader;
ModalWindow.DeleteUserModal = DeleteUserModal;

export default ModalWindow;
