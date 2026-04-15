"use client";

import { useState, useMemo } from "react";
import SearchInput from "@/Components/Ui/SearchInput/SearchInput";
import ExamTable from "./Table/ExamTable";
import AddExamButton from "./Button/AddExamButton";
import { PaginatedResponse } from "@/Util/Types/AipResponse";
import { Exam } from "../types/examType";

interface ExamProps {
    allExams: PaginatedResponse<Exam[]> | null;
}

export default function ExamSection({ allExams }: ExamProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredExams = useMemo(() => {
        if (!searchQuery) return allExams?.items ?? [];
        return (allExams?.items ?? []).filter(e => 
            e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            e.subject?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, allExams]);

    return (
        <div className="flex-1 flex flex-col min-h-screen text-slate-200">
            <div className="flex-1 p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-50">إدارة الامتحانات</h1>
                        <p className="text-sm text-slate-400 mt-1">
                            إجمالي {allExams?.totalItems ?? 0} امتحان
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
                    pageCount={allExams?.totalPages ?? 0}
                />
            </div>
        </div>
    );
}
