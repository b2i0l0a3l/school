"use client";

import { useEffect, useState } from "react";
import Card from "@/Components/Ui/Card/Card";
import { Pencil, Trash2 } from "lucide-react";
import { getRecentStudents } from "../Api/DashboardApi";
import { RecentStudent } from "../types/DashboardTypes";

export default function RecentStudentsTable() {
    const [recentStudents, setRecentStudents] = useState<RecentStudent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const res = await getRecentStudents(6);
                if (res.succeeded && res.value) {
                    setRecentStudents(res.value);
                }
            } catch (error) {
                console.error("Failed to load recent students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <Card
            header={
                <>
                    <h3>آخر الطلاب المسجلين</h3>
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
                            <th className="py-3 px-4 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">تاريخ التسجيل</th>
                            <th className="py-3 px-4 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-slate-400">جاري التحميل...</td>
                            </tr>
                        ) : recentStudents.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-slate-400">لا يوجد طلاب مسجلين حديثاً</td>
                            </tr>
                        ) : (
                            recentStudents.map((student) => (
                                <tr key={student.id} className="border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors">
                                    <td className="py-3.5 px-4 text-sm text-indigo-400 font-semibold whitespace-nowrap">#{student.id}</td>
                                    <td className="py-3.5 px-4 text-sm text-slate-200 whitespace-nowrap">{student.fullName}</td>
                                    <td className="py-3.5 px-4 text-sm text-slate-400 whitespace-nowrap">{student.className || '-'}</td>
                                    <td className="py-3.5 px-4 whitespace-nowrap">
                                        <span className="text-slate-300 text-sm">
                                            {formatDate(student.enrollmentDate)}
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
