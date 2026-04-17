import Table from "@/Components/Ui/Table/Table";
import { Student } from "@/features/Students/types/studentType";
import { DateFormate } from "@/Util/dateFormate";
import { createColumnHelper } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { Class } from "@/features/Class/Type/ClassType";
import DeleteButton from "../Button/deleteButton";
import UpdateStudentButton from "../Button/updateStudentButton";

interface StudentTableProps {
  filterData: Student[];
  pageCount: number;
  classes?: Class[];
}
export default function StudentTable({
  filterData,
  pageCount,
  classes = [],
}: StudentTableProps) {
  const columnHelper = createColumnHelper<Student>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "الرقم",
        cell: (info) => (
          <span className="text-indigo-400 font-semibold">
            #{info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("fullName", {
        header: "الاسم",
      }),
      columnHelper.accessor("dateOfBirth", {
        header: "تاريخ الميلاد",
        cell: (info) => (
          <span className="text-slate-400">
            {DateFormate(info.getValue().toString() as string)}
          </span>
        ),
      }),
      columnHelper.accessor("gender", {
        header: "الجنس",
        cell: (info) => (
          <span className="text-slate-400 opacity-90">
            {info.getValue() == 0 ? "ذكر" : "انثى"}
          </span>
        ),
      }),
      columnHelper.accessor("enrollmentDate", {
        header: "تاريخ التسجيل",
        cell: (info) => (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
            {DateFormate(info.getValue().toString() as string)}
          </span>
        ),
      }),
      columnHelper.accessor("classId", {
        header: "الصف",
        cell: (info) => (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
            {classes.find((c) => c.id === info.getValue())?.className ||
              info.getValue()}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "الإجراءات",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <UpdateStudentButton student={info.row.original} />
            <DeleteButton id={info.row.original.id} />
          </div>
        ),
      }),
    ],
    [classes],
  );
  return <Table data={filterData} pageCount={pageCount} columns={columns} />;
}
