"use client";

import Table from "@/Components/Ui/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Teacher } from "../../types/teacherType";

interface TeacherTableProps {
    data: Teacher[];
    pageCount: number;
}

export default function TeacherTable({ data, pageCount }: TeacherTableProps) {
    const columnHelper = createColumnHelper<Teacher>();

    const columns = useMemo(
        () => [
            columnHelper.accessor("id", {
                header: "الرقم",
                cell: (info) => (
                    <span className="text-indigo-400 font-semibold">#{info.getValue()}</span>
                ),
            }),
            columnHelper.accessor("fullName", {
                header: "الاسم",
                cell: (info) => <span className="text-slate-200">{info.getValue()}</span>,
            }),
            columnHelper.accessor("hireDate", {
                header: "تاريخ التعيين",
                cell: (info) => <span className="text-slate-400 text-xs">{new Date(info.getValue()).toLocaleDateString("ar-EG")}</span>,
            }),
            columnHelper.accessor("department", {
                header: "القسم",
                cell: (info) => (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {info.getValue() || "غير محدد"}
                    </span>
                ),
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
