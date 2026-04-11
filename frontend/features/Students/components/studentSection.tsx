"use client";
import Header from "@/Components/Ui/Header/Header";
import { useMemo, useState } from "react";
import { Student } from "../types/studentType";
import { usePaginationStore } from "@/Context/paginationStore";
import AddStudentButton from "./Button/AddStudentButton";
import dynamic from "next/dynamic";

const StudentTable = dynamic(() => import("./Table/StudentTable"),{loading:()=> <p>loading</p>} );


interface StudentProps {
   allStudents : Student[];
}
export default function StudentSection({allStudents}  : StudentProps){
    
    const [activeFilter, setActiveFilter] = useState("all");
    const page = usePaginationStore((state) => state.pageIndex);
    const pageSize = usePaginationStore((state) => state.pageSize);

    
    const filteredStudents = useMemo(() => {
            if (activeFilter === "active") return allStudents.filter(s => s.status === "نشط");
            if (activeFilter === "absent") return allStudents.filter(s => s.status === "غائب");
            return allStudents;
        }, [activeFilter]);

    const filterData = useMemo(() => {
        return filteredStudents.slice((page - 1) * pageSize, page * pageSize);
    }, [filteredStudents, page, pageSize]);

    const pageCount = Math.ceil(filteredStudents.length / pageSize);

    return (
          <div className="page-container">
            <Header title="إدارة الطلاب" />

            <div className="page-content">
                <div className="page-title-row">
                    <div>
                        <h1>إدارة الطلاب</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
                            إجمالي {filteredStudents.length} طالب
                        </p>
                    </div>
                   <AddStudentButton/>
                </div>

                <div className="filter-chips">
                    <button
                        className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        جميع الطلاب
                    </button>
                    <button
                        className={`filter-chip ${activeFilter === 'active' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('active')}
                    >
                        نشط
                    </button>
                    <button
                        className={`filter-chip ${activeFilter === 'absent' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('absent')}
                    >
                        غائب
                    </button>
                </div>

                <StudentTable filterData={filterData} pageCount={pageCount}/>              
            </div>

        </div>
    );
}