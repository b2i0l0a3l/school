"use client";

import Table from "@/Components/Ui/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Teacher } from "../../types/teacherType";
import UpdateTeacherButton from "../Button/UpdateTeacherButton";
import DeleteTeacherButton from "../Button/DeleteTeacherButton";

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
                cell: (info) => (
                    <div className="flex items-center gap-2">
                        <UpdateTeacherButton teacher={info.row.original} />
                        <DeleteTeacherButton id={info.row.original.id} />
                    </div>
                ),
            }),
        ],
        []
    );

    return <Table data={data} pageCount={pageCount} columns={columns} />;
}
