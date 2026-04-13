"use client";

import { useState, useMemo } from "react";
import SearchInput from "@/Components/Ui/SearchInput/SearchInput";
import TeacherTable, { Teacher } from "./Table/TeacherTable";
import AddTeacherButton from "./Button/AddTeacherButton";

const mockTeachers: Teacher[] = [
    { id: 1, name: "أحمد محمود", email: "ahmed@school.com", subject: "الرياضيات", status: "نشط", joinDate: "2023-01-15" },
    { id: 2, name: "سارة حسن", email: "sara@school.com", subject: "العلوم", status: "نشط", joinDate: "2023-02-20" },
    { id: 3, name: "خالد عبد الله", email: "khaled@school.com", subject: "اللغة العربية", status: "في إجازة", joinDate: "2022-09-01" },
    { id: 4, name: "مريم سعيد", email: "maryam@school.com", subject: "اللغة الإنجليزية", status: "نشط", joinDate: "2023-05-10" },
    { id: 5, name: "يوسف إبراهيم", email: "yousef@school.com", subject: "التاريخ", status: "مستقيل", joinDate: "2021-11-05" },
];

export default function TeacherSection() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTeachers = useMemo(() => {
        if (!searchQuery) return mockTeachers;
        return mockTeachers.filter(t => t.name.includes(searchQuery) || t.subject.includes(searchQuery));
    }, [searchQuery]);

    return (
        <div className="flex-1 flex flex-col min-h-screen text-slate-200">
            <div className="flex-1 p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-50">إدارة المعلمين</h1>
                        <p className="text-sm text-slate-400 mt-1">
                            إجمالي {mockTeachers.length} معلم
                        </p>
                    </div>
                    <AddTeacherButton />
                </div>

                <div className="flex items-center gap-3">
                    <SearchInput
                        placeholder="البحث باسم المعلم أو المادة..."
                        onSearch={(value) => setSearchQuery(value)}
                        className="w-full max-w-sm"
                    />
                </div>

                <TeacherTable
                    data={filteredTeachers}
                    pageCount={1}
                />
            </div>
        </div>
    );
}