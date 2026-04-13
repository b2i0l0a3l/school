import { create } from "zustand";

export type PopupType = "confirm" | "warning" | "danger" | "info";

interface PopupState {
  isOpen: boolean;
  title: string;
  message: string;
  type: PopupType;
  confirmText: string;
  cancelText: string;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
  showPopup: (options: {
    title: string;
    message: string;
    type?: PopupType;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel?: () => void;
  }) => void;
  closePopup: () => void;
}

const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  title: "",
  message: "",
  type: "confirm",
  confirmText: "تأكيد",
  cancelText: "إلغاء",
  onConfirm: null,
  onCancel: null,

  showPopup: (options) =>
    set({
      isOpen: true,
      title: options.title,
      message: options.message,
      type: options.type ?? "confirm",
      confirmText: options.confirmText ?? "تأكيد",
      cancelText: options.cancelText ?? "إلغاء",
      onConfirm: options.onConfirm,
      onCancel: options.onCancel ?? null,
    }),

  closePopup: () =>
    set({
      isOpen: false,
      title: "",
      message: "",
      type: "confirm",
      confirmText: "تأكيد",
      cancelText: "إلغاء",
      onConfirm: null,
      onCancel: null,
    }),
}));

export default usePopupStore;
