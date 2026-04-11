import Table from "@/Components/Ui/Table/Table";
import { Student } from "@/features/Students/types/studentType";
import { createColumnHelper } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo } from "react";

interface StudentTableProps {
    filterData : Student[];
    pageCount : number;
}
export default function StudentTable({filterData,pageCount} : StudentTableProps){
    const columnHelper = createColumnHelper<Student>();
    const columns = useMemo(() => [
        columnHelper.accessor("id", {
            header: "الرقم",
            cell: (info) => (
                <span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>
                    #{info.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor("name", {
            header: "الاسم",
        }),
        columnHelper.accessor("class", {
            header: "الصف",
            cell: (info) => (
                <span style={{ color: 'var(--text-secondary)' }}>{info.getValue()}</span>
            ),
        }),
        columnHelper.accessor("email", {
            header: "البريد الإلكتروني",
            cell: (info) => (
                <span style={{ color: 'var(--text-secondary)', direction: 'ltr', display: 'inline-block' }}>
                    {info.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor("status", {
            header: "الحالة",
            cell: (info) => (
                <span className={`badge ${info.getValue() === 'نشط' ? 'badge-success' : 'badge-warning'}`}>
                    {info.getValue()}
                </span>
            ),
        }),
        columnHelper.display({
            id: "actions",
            header: "الإجراءات",
            cell: () => (
                <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn btn-ghost btn-icon" style={{ width: 32, height: 32, padding: 4 }}>
                        <Pencil size={14} />
                    </button>
                    <button className="btn btn-danger btn-icon" style={{ width: 32, height: 32, padding: 4 }}>
                        <Trash2 size={14} />
                    </button>
                </div>
            ),
        }),
    ], []);
    
    return(
        <Table data={filterData} pageCount={pageCount} columns={columns} />
    );
}