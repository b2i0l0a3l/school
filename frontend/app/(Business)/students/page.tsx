import { Student } from "@/features/Students/types/studentType";
import StudentSection from "@/features/Students/components/studentSection";

const allStudents: Student[] = [
    { id: 1, name: "محمد خالد", class: "12 أ", email: "mohammed@school.com", status: "نشط" },
    { id: 2, name: "فاطمة أحمد", class: "11 ب", email: "fatma@school.com", status: "نشط" },
    { id: 3, name: "يوسف علي", class: "10 ج", email: "yousef@school.com", status: "غائب" },
    { id: 4, name: "نورة سعيد", class: "9 د", email: "noura@school.com", status: "نشط" },
    { id: 5, name: "أحمد محمود", class: "12 ب", email: "ahmed@school.com", status: "نشط" },
    { id: 6, name: "سارة حسن", class: "11 أ", email: "sara@school.com", status: "غائب" },
    { id: 7, name: "عمر خالد", class: "10 أ", email: "omar@school.com", status: "نشط" },
    { id: 8, name: "ريم محمد", class: "9 ب", email: "reem@school.com", status: "نشط" },
    { id: 9, name: "خالد سعد", class: "12 ج", email: "khaled@school.com", status: "غائب" },
];

export default function StudentsPage() {
    return (
      <StudentSection  allStudents={allStudents}   />
    );
}
