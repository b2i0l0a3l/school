"use client";

import usePopupStore from "./PopupStore";
import { AlertTriangle, Info, ShieldAlert, HelpCircle, X } from "lucide-react";

const iconMap = {
  confirm: <HelpCircle size={32} className="text-indigo-400" />,
  warning: <AlertTriangle size={32} className="text-amber-400" />,
  danger: <ShieldAlert size={32} className="text-rose-400" />,
  info: <Info size={32} className="text-teal-400" />,
};

const iconBgMap = {
  confirm: "bg-indigo-500/10 border-indigo-500/20",
  warning: "bg-amber-500/10 border-amber-500/20",
  danger: "bg-rose-500/10 border-rose-500/20",
  info: "bg-teal-500/10 border-teal-500/20",
};

const btnMap = {
  confirm: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25",
  warning: "bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold shadow-lg shadow-amber-500/25",
  danger: "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/25",
  info: "bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-500/25",
};

export default function PopupContainer() {
  const {
    isOpen,
    title,
    message,
    type,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    closePopup,
  } = usePopupStore();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
    closePopup();
  };

  const handleCancel = () => {
    onCancel?.();
    closePopup();
  };

  return (
    <div 
      className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCancel();
      }}
    >
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
        <button 
          className="absolute top-4 left-4 w-8 h-8 flex justify-center items-center rounded-full bg-slate-800 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
          onClick={handleCancel} 
          aria-label="إغلاق"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        <div className={`mx-auto w-16 h-16 rounded-full border flex items-center justify-center mb-5 ${iconBgMap[type]}`}>
          {iconMap[type]}
        </div>

        <h3 className="text-xl font-bold text-slate-50 mb-2">{title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8">{message}</p>

        <div className="flex items-center justify-center gap-3">
          <button
            className={`px-6 py-2.5 rounded-lg text-sm transition-all duration-200 ${btnMap[type]}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
          <button 
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors" 
            onClick={handleCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
