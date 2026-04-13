"use client";

import Table from "@/Components/Ui/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Copy, Trash2, CalendarDays } from "lucide-react";

export interface Exam {
    id: number;
    title: string;
    subject: string;
    date: string;
    duration: string;
    maxScore: number;
    status: string;
}

interface ExamTableProps {
    data: Exam[];
    pageCount: number;
}

export default function ExamTable({ data, pageCount }: ExamTableProps) {
    const columnHelper = createColumnHelper<Exam>();

    const columns = useMemo(
        () => [
            columnHelper.accessor("title", {
                header: "عنوان الامتحان",
                cell: (info) => <span className="text-slate-200 font-medium">{info.getValue()}</span>,
            }),
            columnHelper.accessor("subject", {
                header: "المادة",
                cell: (info) => (
                    <span className="text-indigo-400 font-semibold">{info.getValue()}</span>
                ),
            }),
            columnHelper.accessor("date", {
                header: "تاريخ الانعقاد",
                cell: (info) => (
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                        <CalendarDays size={14} className="text-slate-500" />
                        {info.getValue()}
                    </div>
                ),
            }),
            columnHelper.accessor("duration", {
                header: "المدة",
                cell: (info) => <span className="text-slate-300 text-xs">{info.getValue()}</span>,
            }),
            columnHelper.accessor("maxScore", {
                header: "الدرجة العظمى",
                cell: (info) => <span className="text-emerald-400 font-bold">{info.getValue()} درجة</span>,
            }),
            columnHelper.accessor("status", {
                header: "الحالة",
                cell: (info) => {
                    const status = info.getValue();
                    const isUpcoming = status === 'مجدول';
                    return (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${isUpcoming ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20' : 'bg-slate-700/50 text-slate-400 border-slate-600/50'}`}>
                            {status}
                        </span>
                    );
                },
            }),
            columnHelper.display({
                id: "actions",
                header: "الإجراءات",
                cell: () => (
                    <div className="flex items-center gap-2">
                        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors" title="نسخ الامتحان">
                            <Copy size={15} />
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-colors" title="حذف الامتحان">
                            <Trash2 size={15} />
                        </button>
                    </div>
                ),
            }),
        ],
        []
    );

    return <Table data={data} pageCount={pageCount} columns={columns} />;
}
