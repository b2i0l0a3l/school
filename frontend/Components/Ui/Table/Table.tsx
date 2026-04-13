"use client";
import {
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableBody } from "./TablBody";
import { TableHeader } from "./TableHeader";
import TableFooter from "./TableFooter";
import { TableProps } from "@/Util/Types/TableProps";

export default function Table<T>({
  data,
  columns,
  pageCount,
}: TableProps<T>) {
  const table = useReactTable({
    data: data ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pageCount,
  });

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl w-full">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-right border-collapse">
          <TableHeader table={table} />
          <TableBody table={table} />
        </table>
      </div>
      <TableFooter pageCount={pageCount} />
    </div>
  );
}
