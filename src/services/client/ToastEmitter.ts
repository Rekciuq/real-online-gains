import { toast } from "react-toastify";

class ToastEmitter {
  static success = (msg: string) => toast.success(msg);
  static error = (msg: string) => toast.error(msg);
  static warning = (msg: string) => toast.warning(msg);
  static info = (msg: string) => toast.info(msg);
}

export default ToastEmitter;
