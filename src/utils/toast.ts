import { toast } from "react-toastify";
export const showErrorToast = (message: string) =>
  toast(message, {
    autoClose: 2000,
    type: "error",
  });
export const showSuccessToast = (message: string) =>
  toast(message, {
    autoClose: 2000,
    type: "success",
  });
