"use client";

import Table from "@/Components/Ui/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Attendance, AttendanceStatus } from "../../types/attendanceType";

interface AttendanceTableProps {
    data: Attendance[];
    pageCount: number;
}

export default function AttendanceTable({ data, pageCount }: AttendanceTableProps) {
    const columnHelper = createColumnHelper<Attendance>();

    const columns = useMemo(
        () => [
            columnHelper.accessor("studentId", {
                header: "رقم الطالب",
                cell: (info) => (
                    <span className="text-indigo-400 font-semibold">#{info.getValue()}</span>
                ),
            }),
            columnHelper.accessor("studentName", {
                header: "اسم الطالب",
                cell: (info) => <span className="text-slate-200">{info.getValue() || "غير معروف"}</span>,
            }),
            columnHelper.accessor("class", {
                header: "الفصل",
                cell: (info) => (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {info.getValue() || "غير محدد"}
                    </span>
                ),
            }),
            columnHelper.accessor("date", {
                header: "التاريخ",
                cell: (info) => <span className="text-slate-400 font-mono text-xs">{new Date(info.getValue()).toLocaleDateString("ar-EG")}</span>,
            }),
            columnHelper.accessor("status", {
                header: "الحالة",
                cell: (info) => {
                    const status = info.getValue();
                    let colorClasses = '';
                    let statusText = '';
                    
                    if (status === AttendanceStatus.Present) {
                        colorClasses = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
                        statusText = 'حاضر';
                    } else if (status === AttendanceStatus.Absent) {
                        colorClasses = 'bg-rose-500/15 text-rose-400 border-rose-500/20';
                        statusText = 'غائب';
                    } else {
                        colorClasses = 'bg-amber-500/15 text-amber-400 border-amber-500/20';
                        statusText = 'متأخر';
                    }
                    
                    return (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${colorClasses}`}>
                            {statusText}
                        </span>
                    );
                },
            }),
            columnHelper.display({
                id: "actions",
                header: "تسجيل سريع",
                cell: () => (
                    <div className="flex items-center gap-2">
                        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-colors" title="تسجيل حضور">
                            <CheckCircle2 size={16} />
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-colors" title="تسجيل غياب">
                            <XCircle size={16} />
                        </button>
                    </div>
                ),
            }),
        ],
        []
    );

    return <Table data={data} pageCount={pageCount} columns={columns} />;
}
