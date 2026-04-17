"use client";

import { useState, useMemo } from "react";
import SearchInput from "@/Components/Ui/SearchInput/SearchInput";
import ClassTable from "./Table/ClassTable";
import AddClassButton from "./Button/AddClassButton";
import { PaginatedResponse } from "@/Util/Types/AipResponse";
import { Class } from "../Type/ClassType";

interface ClassProps {
    allClasses: PaginatedResponse<Class[]> | null;
}

export default function ClassSection({ allClasses }: ClassProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredClasses = useMemo(() => {
        if (!searchQuery) return allClasses?.items ?? [];
        return (allClasses?.items ?? []).filter(c =>
            c.className.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, allClasses]);

    return (
        <div className="flex-1 flex flex-col min-h-screen text-slate-200">
            <div className="flex-1 p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-50">إدارة الفصول الدراسية</h1>
                        <p className="text-sm text-slate-400 mt-1">
                            إجمالي {allClasses?.totalItems ?? 0} فصل
                        </p>
                    </div>
                    <AddClassButton />
                </div>

                <div className="flex items-center gap-3">
                    <SearchInput
                        placeholder="البحث باسم الفصل..."
                        onSearch={(value) => setSearchQuery(value)}
                        className="w-full max-w-sm"
                    />
                </div>

                <ClassTable
                    data={filteredClasses}
                    pageCount={allClasses?.totalPages ?? 0}
                />
            </div>
        </div>
    );
}
