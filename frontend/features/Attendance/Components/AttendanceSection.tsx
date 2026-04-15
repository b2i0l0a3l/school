"use client";

import { useState, useMemo } from "react";
import SearchInput from "@/Components/Ui/SearchInput/SearchInput";
import AttendanceTable from "./Table/AttendanceTable";
import Button from "@/Components/Ui/Button/Button";
import { FileSpreadsheet } from "lucide-react";
import { PaginatedResponse } from "@/Util/Types/AipResponse";
import { Attendance } from "../types/attendanceType";

interface AttendanceProps {
    allAttendance: PaginatedResponse<Attendance[]> | null;
}

export default function AttendanceSection({ allAttendance }: AttendanceProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);

    const filteredRecords = useMemo(() => {
        let filtered = allAttendance?.items ?? [];
        if (dateFilter) filtered = filtered.filter(r => r.date.startsWith(dateFilter));
        if (searchQuery) {
            filtered = filtered.filter(r => 
                r.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                r.class?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return filtered;
    }, [searchQuery, dateFilter, allAttendance]);

    return (
        <div className="flex-1 flex flex-col min-h-screen text-slate-200">
            <div className="flex-1 p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-50">سجل الحضور والغياب</h1>
                        <p className="text-sm text-slate-400 mt-1">
                            إجمالي {allAttendance?.totalItems ?? 0} سجل
                        </p>
                    </div>
                    <Button
                        text="تصدير كـ Excel"
                        icon={<FileSpreadsheet size={16} />}
                        variant="outline"
                    />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-700/50">
                    <SearchInput
                        placeholder="البحث باسم الطالب أو الفصل..."
                        onSearch={(value) => setSearchQuery(value)}
                        className="w-full md:w-80"
                    />
                    <div className="flex flex-col gap-1.5 w-full md:w-48">
                        <label className="text-xs font-medium text-slate-400 px-1">تاريخ السجل</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/50 hover:border-slate-500/50 focus:border-indigo-500 rounded-lg text-slate-200 text-sm outline-none transition-all duration-200 shadow-[0_0_0_3px_rgba(99,102,241,0.0)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] appearance-none"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>
                </div>

                <AttendanceTable
                    data={filteredRecords}
                    pageCount={allAttendance?.totalPages ?? 0}
                />
            </div>
        </div>
    );
}
