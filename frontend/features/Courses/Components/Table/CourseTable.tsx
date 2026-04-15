"use client";

import Table from "@/Components/Ui/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Course } from "../../types/courseType";

interface CourseTableProps {
    data: Course[];
    pageCount: number;
}

export default function CourseTable({ data, pageCount }: CourseTableProps) {
    const columnHelper = createColumnHelper<Course>();

    const columns = useMemo(
        () => [
            columnHelper.accessor("id", {
                header: "الرقم",
                cell: (info) => (
                    <span className="text-indigo-400 font-semibold">#{info.getValue()}</span>
                ),
            }),
            columnHelper.accessor("subjectName", {
                header: "اسم المنهج",
                cell: (info) => <span className="text-slate-200">{info.getValue()}</span>,
            }),
            columnHelper.accessor("creatAt", {
                header: "تاريخ الإنشاء",
                cell: (info) => <span className="text-slate-400 text-xs">{new Date(info.getValue()).toLocaleDateString("ar-EG")}</span>,
            }),
            columnHelper.display({
                id: "actions",
                header: "الإجراءات",
                cell: () => (
                    <div className="flex items-center gap-2">
                        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors">
                            <Pencil size={15} />
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-colors">
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
