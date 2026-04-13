import { Row, flexRender } from "@tanstack/react-table";
import { memo } from "react";

interface RowProps<T> {
  row: Row<T>;
}

function TableRowInner<T>({ row }: RowProps<T>) {
  return (
    <tr className="border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors">
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="py-3.5 px-5 text-sm text-slate-200 whitespace-nowrap">
          {flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )}
        </td>
      ))}
    </tr>
  );
}

export const TableRow = memo(TableRowInner) as typeof TableRowInner;