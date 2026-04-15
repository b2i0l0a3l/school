"use client";

import { useState, useMemo } from "react";
import SearchInput from "@/Components/Ui/SearchInput/SearchInput";
import CourseTable from "./Table/CourseTable";
import AddCourseButton from "./Button/AddCourseButton";
import { PaginatedResponse } from "@/Util/Types/AipResponse";
import { Course } from "../types/courseType";

interface CourseProps {
    allCourses: PaginatedResponse<Course[]> | null;
}

export default function CourseSection({ allCourses }: CourseProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCourses = useMemo(() => {
        if (!searchQuery) return allCourses?.items ?? [];
        return (allCourses?.items ?? []).filter(c => 
            c.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, allCourses]);

    return (
        <div className="flex-1 flex flex-col min-h-screen text-slate-200">
            <div className="flex-1 p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-50">إدارة المناهج الدراسية</h1>
                        <p className="text-sm text-slate-400 mt-1">
                            إجمالي {allCourses?.totalItems ?? 0} منهج
                        </p>
                    </div>
                    <AddCourseButton />
                </div>

                <div className="flex items-center gap-3">
                    <SearchInput
                        placeholder="البحث باسم المنهج..."
                        onSearch={(value) => setSearchQuery(value)}
                        className="w-full max-w-md"
                    />
                </div>

                <CourseTable
                    data={filteredCourses}
                    pageCount={allCourses?.totalPages ?? 0}
                />
            </div>
        </div>
    );
}
