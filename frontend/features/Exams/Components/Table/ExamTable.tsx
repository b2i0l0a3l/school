"use client";

import Table from "@/Components/Ui/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { CalendarDays } from "lucide-react";
import { Exam } from "../../types/examType";
import UpdateExamButton from "../Button/UpdateExamButton";
import DeleteExamButton from "../Button/DeleteExamButton";

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
                    <span className="text-indigo-400 font-semibold">{info.getValue() || "غير محدد"}</span>
                ),
            }),
            columnHelper.accessor("date", {
                header: "تاريخ الانعقاد",
                cell: (info) => (
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                        <CalendarDays size={14} className="text-slate-50" />
                        {new Date(info.getValue()).toLocaleString("ar-EG")}
                    </div>
                ),
            }),
            columnHelper.accessor("maxScore", {
                header: "الدرجة العظمى",
                cell: (info) => <span className="text-emerald-400 font-bold">{info.getValue()} درجة</span>,
            }),
            columnHelper.display({
                id: "actions",
                header: "الإجراءات",
                cell: (info) => (
                    <div className="flex items-center gap-2">
                        <UpdateExamButton exam={info.row.original} />
                        <DeleteExamButton id={info.row.original.id} />
                    </div>
                ),
            }),
        ],
        []
    );

    return <Table data={data} pageCount={pageCount} columns={columns} />;
}
