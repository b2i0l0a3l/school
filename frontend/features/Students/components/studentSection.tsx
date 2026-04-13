"use client";
import { Student } from "../types/studentType";
import dynamic from "next/dynamic";
import { PaginatedResponse } from "@/Util/Types/AipResponse";
import { useEffect, useState } from "react";
import useClassStore from "@/features/Class/Store/ClassStore";
import { Class } from "@/features/Class/Type/ClassType";
import SearchInput from "@/Components/Ui/SearchInput/SearchInput";
import Header from "@/Components/Ui/Header/Header";
import AddStudentButton from "./Button/AddStudentButton";

const StudentTable = dynamic(() => import("./Table/StudentTable"), {
  loading: () => <p>loading</p>,
});

interface StudentProps {
  allStudents: PaginatedResponse<Student[]> | null;
  initialClasses: Class[];
}
export default function StudentSection({ allStudents, initialClasses }: StudentProps) {
  const setClasses = useClassStore(state => state.setClasses);

  useEffect(() => {
    setClasses(initialClasses);
  }, [initialClasses, setClasses]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = allStudents?.items?.filter((student) => {
    if (!searchQuery) return true;
    return student.fullName.toLowerCase().includes(searchQuery.toLowerCase());
  }) ?? [];

  return (
    <div className="flex-1 flex flex-col min-h-screen text-slate-200">
      <div className="flex-1 p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-50">إدارة الطلاب</h1>
            <p className="text-sm text-slate-400 mt-1">
              إجمالي {allStudents?.totalItems ?? 0} طالب
            </p>
          </div>
          <AddStudentButton />
        </div>

        <div className="flex items-center gap-3">
          <SearchInput 
            placeholder="البحث باسم الطالب..."
            onSearch={(value) => setSearchQuery(value)}
            className="w-full max-w-sm"
          />
        </div>

        <StudentTable
          filterData={filteredStudents}
          pageCount={allStudents?.totalPages ?? 0}
          classes={initialClasses}
        />
      </div>
    </div>
  );
}

