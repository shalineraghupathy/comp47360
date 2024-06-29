import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToastSuccess = (msg: string): void => {
  toast.success(msg, {
    position: "top-right",
  });
};

export const showToastError = (msg: string): void => {
  toast.error(msg, {
    position: "top-right",
  });
};

export const showToastNotification = (msg: string): void => {
  toast.warning(msg, {
    position: "top-right",
  });
};

export const showToastInfo = (msg: string): void => {
  toast.info(msg, {
    position: "top-right",
  });
};
