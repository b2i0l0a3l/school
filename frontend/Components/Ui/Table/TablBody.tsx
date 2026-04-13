import { TableRow } from "./TableRow";
import { Table as ReactTable } from "@tanstack/react-table";

interface BodyProps<T> {
  table: ReactTable<T>;
}
export function TableBody<T>({table}: BodyProps<T>) {
  return (
    <tbody>
      {table.getRowModel().rows.length === 0 ? (
        <tr>
          <td colSpan={table.getAllColumns().length} className="text-center py-8">
            <p className="text-slate-400">لا توجد بيانات</p>
          </td>
        </tr>
      ) : (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} row={row} />
        ))
      )}
    </tbody>
  );
}
