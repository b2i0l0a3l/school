"use client";

import { useState, useMemo } from "react";
import SearchInput from "@/Components/Ui/SearchInput/SearchInput";
import ExamTable, { Exam } from "./Table/ExamTable";
import AddExamButton from "./Button/AddExamButton";

const mockExams: Exam[] = [
    { id: 1, title: "اختبار منتصف الفصل الأول", subject: "الرياضيات", date: "2023-11-15 08:00 AM", duration: "120 دقيقة", maxScore: 50, status: "مكتمل" },
    { id: 2, title: "اختبار دوري قصير", subject: "الفيزياء", date: "2023-11-20 10:00 AM", duration: "45 دقيقة", maxScore: 20, status: "مكتمل" },
    { id: 3, title: "الامتحان النهائي", subject: "التاريخ", date: "2023-12-10 09:00 AM", duration: "180 دقيقة", maxScore: 100, status: "مجدول" },
    { id: 4, title: "اختبار الفصل الثالث", subject: "اللغة العربية", date: "2023-12-05 11:30 AM", duration: "60 دقيقة", maxScore: 30, status: "مجدول" },
];

export default function ExamSection() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredExams = useMemo(() => {
        if (!searchQuery) return mockExams;
        return mockExams.filter(e => e.title.includes(searchQuery) || e.subject.includes(searchQuery));
    }, [searchQuery]);

    return (
        <div className="flex-1 flex flex-col min-h-screen text-slate-200">
            <div className="flex-1 p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-50">إدارة الامتحانات</h1>
                        <p className="text-sm text-slate-400 mt-1">
                            إجمالي {mockExams.length} امتحان
                        </p>
                    </div>
                    <AddExamButton />
                </div>

                <div className="flex items-center gap-3">
                    <SearchInput
                        placeholder="البحث بعنوان الامتحان أو المادة..."
                        onSearch={(value) => setSearchQuery(value)}
                        className="w-full max-w-md"
                    />
                </div>

                <ExamTable
                    data={filteredExams}
                    pageCount={1}
                />
            </div>
        </div>
    );
}
