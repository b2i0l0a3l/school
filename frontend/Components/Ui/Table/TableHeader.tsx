import { flexRender, Table as ReactTable } from "@tanstack/react-table";

interface HeaderProps<T> {
  table: ReactTable<T>;
} 
export function TableHeader<T>({table}: HeaderProps<T>) {
  return (
    <thead className="bg-indigo-500/10 border-b border-slate-700/50">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} className="py-3 px-5 text-slate-400 font-semibold uppercase tracking-wider text-xs">
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
