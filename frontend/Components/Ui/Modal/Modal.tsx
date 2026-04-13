"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-hidden bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-slate-100">{title}</h2>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/50 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors" onClick={onClose} aria-label="إغلاق">
                        <X size={18} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
                    {children}
                </div>
                {footer && (
                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-900/50 border-t border-slate-800">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
