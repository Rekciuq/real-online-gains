import Header from "../Header";
import { MouseEventHandler } from "react";

type ModalHeaderProps = {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
};

const ModalHeader = ({ children, onClick }: ModalHeaderProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full">
        <Header className="text-lg">{children}</Header>
        <div
          onClick={onClick}
          className="flex h-5 w-5 group justify-center items-center relative cursor-pointer"
        >
          <div className="absolute w-full border-b-2 rotate-45 border-emerald-300 max-md:border-b group-hover:border-emerald-200 transition-colors"></div>
          <div className="absolute w-full border-b-2 -rotate-45 border-emerald-300 max-md:border-b group-hover:border-emerald-200 transition-colors"></div>
        </div>
      </div>
      <div className="w-full border-b border-b-emerald-300 mt-2 opacity-30"></div>
    </div>
  );
};

export default ModalHeader;
