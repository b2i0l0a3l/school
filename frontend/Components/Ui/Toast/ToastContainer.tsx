"use client";

import { useEffect, useState } from "react";
import useToastStore, { Toast as ToastType } from "./ToastStore";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const iconMap = {
  success: <CheckCircle size={20} className="text-emerald-400" />,
  error: <XCircle size={20} className="text-rose-400" />,
  warning: <AlertTriangle size={20} className="text-amber-400" />,
  info: <Info size={20} className="text-indigo-400" />,
};

const bgMap = {
  success: "bg-emerald-500/10 border-emerald-500/20",
  error: "bg-rose-500/10 border-rose-500/20",
  warning: "bg-amber-500/10 border-amber-500/20",
  info: "bg-indigo-500/10 border-indigo-500/20",
};

const progressMap = {
  success: "bg-gradient-to-r from-transparent to-emerald-500",
  error: "bg-gradient-to-r from-transparent to-rose-500",
  warning: "bg-gradient-to-r from-transparent to-amber-500",
  info: "bg-gradient-to-r from-transparent to-indigo-500",
};

function ToastItem({ toast }: { toast: ToastType }) {
  const removeToast = useToastStore((s) => s.removeToast);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const exitTimer = setTimeout(() => {
        setExiting(true);
      }, toast.duration - 300);
      return () => clearTimeout(exitTimer);
    }
  }, [toast.duration]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => removeToast(toast.id), 300);
  };

  return (
    <div
      className={`relative flex items-center gap-3 p-4 rounded-xl border bg-slate-900/95 backdrop-blur-xl shadow-xl shadow-black/20 pointer-events-auto transition-all duration-300 overflow-hidden
        ${bgMap[toast.type]}
        ${exiting ? "opacity-0 translate-y-2 scale-95" : "animate-in slide-in-from-top-4 fade-in duration-300"}`}
      role="alert"
    >
      <div className="shrink-0 flex items-center justify-center">
        {iconMap[toast.type]}
      </div>
      <p className="flex-1 text-sm font-medium text-slate-100 m-0 leading-snug">
        {toast.message}
      </p>
      <button 
        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 transition-colors" 
        onClick={handleClose} 
        aria-label="إغلاق"
      >
        <X size={16} strokeWidth={2.5} />
      </button>
      {toast.duration && toast.duration > 0 && (
        <div
          className={`absolute bottom-0 right-0 h-[3px] w-full origin-right ${progressMap[toast.type]}`}
          style={{ 
            animation: `toastProgress ${toast.duration}ms linear forwards` 
          }}
        />
      )}
    </div>
  );
}

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
      {/* We need this basic keyframe injected for the smooth progress line */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes toastProgress { from { transform: scaleX(1); } to { transform: scaleX(0); } }
      `}} />
    </div>
  );
}
