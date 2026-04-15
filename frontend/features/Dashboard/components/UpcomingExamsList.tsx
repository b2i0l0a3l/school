"use client";

import { useEffect, useState } from "react";
import Card from "@/Components/Ui/Card/Card";
import { getUpcomingExams } from "../Api/DashboardApi";
import { UpcomingExam } from "../types/DashboardTypes";

export default function UpcomingExamsList() {
    const [upcomingExams, setUpcomingExams] = useState<UpcomingExam[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchExams = async () => {
            setLoading(true);
            try {
                const res = await getUpcomingExams(5);
                if (res.succeeded && res.value) {
                    setUpcomingExams(res.value);
                }
            } catch (error) {
                console.error("Failed to load upcoming exams:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const getDaysDiff = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(date.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <Card
            header={
                <>
                    <h3>الامتحانات القادمة</h3>
                </>
            }
        >
            <div className="flex flex-col">
                {loading ? (
                    <div className="py-4 text-center text-slate-400">جاري التحميل...</div>
                ) : upcomingExams.length === 0 ? (
                    <div className="py-4 text-center text-slate-400">لا يوجد امتحانات قادمة قريباً</div>
                ) : (
                    upcomingExams.map((exam, index) => (
                        <div key={exam.id} className={`flex gap-3 items-start ${index < upcomingExams.length - 1 ? 'pb-4 mb-4 border-b border-slate-700/50' : ''}`}>
                            <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                            <div>
                                <div className="text-[13px] text-slate-200 leading-relaxed font-medium">
                                    {exam.subjectName} - {exam.title}
                                </div>
                                <div className="text-xs text-slate-500 mt-1 flex gap-2">
                                    <span>{formatDate(exam.date)}</span>
                                    <span>•</span>
                                    <span className="text-amber-400">{getDaysDiff(exam.date)} أيام متبقية</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
}
