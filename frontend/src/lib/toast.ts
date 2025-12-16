import { toast } from "react-hot-toast";

export const toastSuccess = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: "top-right",
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    duration: 4000,
    position: "top-right",
  });
};

export const toastLoading = (message: string) => {
  return toast.loading(message, {
    position: "top-right",
  });
};

export const toastDismiss = (id: string) => {
  toast.dismiss(id);
};
