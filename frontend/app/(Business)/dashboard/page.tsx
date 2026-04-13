"use client";

import Header from "@/Components/Ui/Header/Header";
import StatCard from "@/Components/Ui/Card/StatCard";
import Card from "@/Components/Ui/Card/Card";
import {
    Users,
    GraduationCap,
    BookOpen,
    ClipboardCheck,
    Pencil,
    Trash2,
} from "lucide-react";

const recentStudents = [
    { id: 101, name: "محمد خالد", class: "12 أ", status: "نشط" },
    { id: 102, name: "فاطمة أحمد", class: "11 ب", status: "نشط" },
    { id: 103, name: "يوسف علي", class: "10 ج", status: "غائب" },
    { id: 104, name: "نورة سعيد", class: "9 د", status: "نشط" },
    { id: 105, name: "أحمد محمود", class: "12 ب", status: "نشط" },
    { id: 106, name: "سارة حسن", class: "11 أ", status: "غائب" },
];

const recentActivity = [
    { text: "تم تسجيل طالب جديد: عمر أحمد", time: "منذ 5 دقائق" },
    { text: "تم تحديث درجات الفصل 12 أ", time: "منذ 15 دقيقة" },
    { text: "تم إضافة امتحان رياضيات", time: "منذ ساعة" },
    { text: "تم تسجيل حضور الفصل 10 ب", time: "منذ ساعتين" },
    { text: "تم تعيين معلم جديد: سارة محمد", time: "منذ 3 ساعات" },
];

export default function DashboardPage() {
    return (
        <div className="flex-1 flex flex-col min-h-screen text-slate-200">
            <Header title="لوحة القيادة" />

            <div className="flex-1 p-8 flex flex-col gap-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatCard
                        label="إجمالي الطلاب"
                        value={512}
                        icon={<Users size={22} />}
                        iconColor="indigo"
                        change={12}
                    />
                    <StatCard
                        label="إجمالي المعلمين"
                        value={48}
                        icon={<GraduationCap size={22} />}
                        iconColor="teal"
                        change={5}
                    />
                    <StatCard
                        label="الفصول النشطة"
                        value={24}
                        icon={<BookOpen size={22} />}
                        iconColor="emerald"
                        change={8}
                    />
                    <StatCard
                        label="نسبة الحضور اليوم"
                        value="94.2%"
                        icon={<ClipboardCheck size={22} />}
                        iconColor="amber"
                        change={-2}
                    />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
                    {/* Recent Students Table */}
                    <Card
                        header={
                            <>
                                <h3>سجلات الطلاب الحديثة</h3>
                                <button className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg transition-colors">عرض الكل</button>
                            </>
                        }
                    >
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-sm text-right border-collapse">
                                <thead className="bg-indigo-500/5 border-b border-slate-700/50">
                                    <tr>
                                        <th className="py-3 px-4 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">المعرف</th>
                                        <th className="py-3 px-4 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">الاسم</th>
                                        <th className="py-3 px-4 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">الفصل</th>
                                        <th className="py-3 px-4 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">الحالة</th>
                                        <th className="py-3 px-4 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentStudents.map((student) => (
                                        <tr key={student.id} className="border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors">
                                            <td className="py-3.5 px-4 text-sm text-indigo-400 font-semibold whitespace-nowrap">#{student.id}</td>
                                            <td className="py-3.5 px-4 text-sm text-slate-200 whitespace-nowrap">{student.name}</td>
                                            <td className="py-3.5 px-4 text-sm text-slate-400 whitespace-nowrap">{student.class}</td>
                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${student.status === 'نشط' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/15 text-amber-400 border-amber-500/20'}`}>
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors">
                                                        <Pencil size={15} />
                                                    </button>
                                                    <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-colors">
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Recent Activity */}
                    <Card
                        header={
                            <>
                                <h3>النشاط الأخير</h3>
                            </>
                        }
                    >
                        <div className="flex flex-col">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className={`flex gap-3 items-start ${index < recentActivity.length - 1 ? 'pb-4 mb-4 border-b border-slate-700/50' : ''}`}>
                                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                                    <div>
                                        <div className="text-[13px] text-slate-200 leading-relaxed font-medium">
                                            {activity.text}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1">
                                            {activity.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
