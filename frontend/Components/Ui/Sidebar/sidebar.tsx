"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    ClipboardCheck,
    CalendarCheck,
    Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
    {
        title: "لوحة القيادة",
        href: "/",
        icon: <LayoutDashboard size={20} />,
    },
    {
        title: "إدارة الطلاب",
        href: "/students",
        icon: <Users size={20} />,
    },
    {
        title: "إدارة المعلمين",
        href: "/teachers",
        icon: <GraduationCap size={20} />,
    },
    {
        title: "إدارة المناهج",
        href: "/courses",
        icon: <BookOpen size={20} />,
    },
    {
        title: "إدارة الحضور",
        href: "/attendance",
        icon: <ClipboardCheck size={20} />,
    },
    {
        title: "إدارة الامتحانات",
        href: "/exams",
        icon: <CalendarCheck size={20} />,
    },
    {
        title: "الإعدادات",
        href: "/settings",
        icon: <Settings size={20} />,
    },
];

export default function SideBar() {
    const pathname = usePathname();

    return (
        <div className="w-[260px] min-w-[260px] h-screen sticky top-0 bg-slate-950 border-l border-slate-800/50 flex flex-col overflow-y-auto z-40 hidden md:flex">
            {/* Logo */}
            <div className="px-5 py-6 flex items-center justify-center gap-3 border-b border-slate-800/50">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-700 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(67,56,202,0.2)]">
                    <GraduationCap size={22} />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
                    بوابة المدرسة
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 flex flex-col gap-1">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all relative overflow-hidden group
                                ${isActive 
                                    ? "bg-indigo-500/10 text-indigo-400" 
                                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                                }`}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[60%] bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-r-md" />
                            )}
                            <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">{link.icon}</span>
                            <span>{link.title}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t border-slate-800/50">
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-300 font-semibold border border-slate-700">
                        م
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-200">المدير</div>
                        <div className="text-xs text-slate-500">admin@school.com</div>
                    </div>
                </div>
            </div>
        </div>
    );
}