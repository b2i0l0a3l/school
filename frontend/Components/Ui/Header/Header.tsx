"use client";

import { Search, Bell } from "lucide-react";

interface HeaderProps {
    title: string;
    children?: React.ReactNode;
}

export default function Header({ title, children }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
            <h1 className="text-xl font-bold text-slate-100">{title}</h1>
            <div className="flex items-center gap-4">
                {children}
                <div className="relative w-72 hidden md:block">
                    <input
                        className="w-full pl-4 pr-10 py-2 bg-slate-900/60 border border-slate-800 rounded-full text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        placeholder="ابحث عن طالب، معلم، فصل..."
                        type="search"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                </div>
                <button className="relative w-10 h-10 flex items-center justify-center rounded-full border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all" aria-label="الإشعارات">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-slate-950" />
                </button>
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-sm font-bold text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                    م
                </div>
            </div>
        </header>
    );
}
