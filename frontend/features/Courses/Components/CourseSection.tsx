"use client";

import { useState, useMemo } from "react";
import SearchInput from "@/Components/Ui/SearchInput/SearchInput";
import CourseTable, { Course } from "./Table/CourseTable";
import AddCourseButton from "./Button/AddCourseButton";

const mockCourses: Course[] = [
    { id: 1, code: "MATH101", title: "تفاضل وتكامل 1", credits: 4, teacher: "أحمد محمود", status: "نشط" },
    { id: 2, code: "PHYS101", title: "فيزياء عامة 1", credits: 4, teacher: "سارة حسن", status: "نشط" },
    { id: 3, code: "CS101", title: "مقدمة في البرمجة", credits: 3, teacher: "مريم سعيد", status: "نشط" },
    { id: 4, code: "ENG101", title: "لغة إنجليزية 1", credits: 2, teacher: "", status: "غير نشط" },
    { id: 5, code: "HIST101", title: "تاريخ العالم الحديث", credits: 3, teacher: "يوسف إبراهيم", status: "نشط" },
];

export default function CourseSection() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCourses = useMemo(() => {
        if (!searchQuery) return mockCourses;
        return mockCourses.filter(c => 
            c.title.includes(searchQuery) || 
            c.code.includes(searchQuery) || 
            c.teacher.includes(searchQuery)
        );
    }, [searchQuery]);

    return (
        <div className="flex-1 flex flex-col min-h-screen text-slate-200">
            <div className="flex-1 p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-50">إدارة المناهج الدراسية</h1>
                        <p className="text-sm text-slate-400 mt-1">
                            إجمالي {mockCourses.length} منهج
                        </p>
                    </div>
                    <AddCourseButton />
                </div>

                <div className="flex items-center gap-3">
                    <SearchInput
                        placeholder="البحث برمز أو اسم المنهج أو المعلم..."
                        onSearch={(value) => setSearchQuery(value)}
                        className="w-full max-w-md"
                    />
                </div>

                <CourseTable
                    data={filteredCourses}
                    pageCount={1}
                />
            </div>
        </div>
    );
}
