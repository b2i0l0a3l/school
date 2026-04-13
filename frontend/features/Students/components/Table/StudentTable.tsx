import Table from "@/Components/Ui/Table/Table";
import useClassStore from "@/features/Class/Store/ClassStore";
import { Student } from "@/features/Students/types/studentType";
import { DateFormate } from "@/Util/dateFormate";
import { createColumnHelper } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo } from "react";

import { Class } from "@/features/Class/Type/ClassType";

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
    [classes],
  );

  return <Table data={filterData} pageCount={pageCount} columns={columns} />;
}
