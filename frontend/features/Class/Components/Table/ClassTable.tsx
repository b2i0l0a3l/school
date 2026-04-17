"use client";

import Table from "@/Components/Ui/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Class } from "../../Type/ClassType";
import UpdateClassButton from "../Button/UpdateClassButton";
import DeleteClassButton from "../Button/DeleteClassButton";

interface ClassTableProps {
    data: Class[];
    pageCount: number;
}

export default function ClassTable({ data, pageCount }: ClassTableProps) {
    const columnHelper = createColumnHelper<Class>();

    const columns = useMemo(
        () => [
            columnHelper.accessor("id", {
                header: "الرقم",
                cell: (info) => (
                    <span className="text-indigo-400 font-semibold">#{info.getValue()}</span>
                ),
            }),
            columnHelper.accessor("className", {
                header: "اسم الفصل",
                cell: (info) => <span className="text-slate-200">{info.getValue()}</span>,
            }),
            columnHelper.accessor("year", {
                header: "السنة الدراسية",
                cell: (info) => (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.display({
                id: "actions",
                header: "الإجراءات",
                cell: (info) => (
                    <div className="flex items-center gap-2">
                        <UpdateClassButton classData={info.row.original} />
                        <DeleteClassButton id={info.row.original.id} />
                    </div>
                ),
            }),
        ],
        []
    );

    return <Table data={data} pageCount={pageCount} columns={columns} />;
}
