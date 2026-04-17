"use client";

import Table from "@/Components/Ui/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Course } from "../../types/courseType";
import UpdateCourseButton from "../Button/UpdateCourseButton";
import DeleteCourseButton from "../Button/DeleteCourseButton";

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
                cell: (info) => (
                    <div className="flex items-center gap-2">
                        <UpdateCourseButton course={info.row.original} />
                        <DeleteCourseButton id={info.row.original.id} />
                    </div>
                ),
            }),
        ],
        []
    );

    return <Table data={data} pageCount={pageCount} columns={columns} />;
}
