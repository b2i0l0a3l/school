import { createStore } from "zustand";
import { Student } from "../types/studentType";

interface StudentState {
    students: Record<number,Student>;
    setStudents: (students: Student[]) => void;
}
const StudentStore = createStore<StudentState>((set) => ({
    students: {},
    setStudents: (students: Student[]) => set((state) => ({students: {...state.students, ...students.reduce((acc, student) => {
        acc[student.id] = student;
        return acc;
    }, {} as Record<number,Student>)} })),
}));


export default StudentStore;