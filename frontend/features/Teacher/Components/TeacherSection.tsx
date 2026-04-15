"use client";

import { useState, useMemo } from "react";
import SearchInput from "@/Components/Ui/SearchInput/SearchInput";
import TeacherTable from "./Table/TeacherTable";
import AddTeacherButton from "./Button/AddTeacherButton";
import { PaginatedResponse } from "@/Util/Types/AipResponse";
import { Teacher } from "../types/teacherType";

interface TeacherProps {
    allTeachers: PaginatedResponse<Teacher[]> | null;
}

export default function TeacherSection({ allTeachers }: TeacherProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTeachers = useMemo(() => {
        if (!searchQuery) return allTeachers?.items ?? [];
        return (allTeachers?.items ?? []).filter(t => 
            t.fullName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, allTeachers]);

    return (
        <div className="flex-1 flex flex-col min-h-screen text-slate-200">
            <div className="flex-1 p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-50">إدارة المعلمين</h1>
                        <p className="text-sm text-slate-400 mt-1">
                            إجمالي {allTeachers?.totalItems ?? 0} معلم
                        </p>
                    </div>
                    <AddTeacherButton />
                </div>

                <div className="flex items-center gap-3">
                    <SearchInput
                        placeholder="البحث باسم المعلم..."
                        onSearch={(value) => setSearchQuery(value)}
                        className="w-full max-w-sm"
                    />
                </div>

                <TeacherTable
                    data={filteredTeachers}
                    pageCount={allTeachers?.totalPages ?? 0}
                />
            </div>
        </div>
    );
}