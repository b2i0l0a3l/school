
import { create } from "zustand";

interface StudentState {
    page:number;
    setPage: (page: number) => void;
}
const StudentStore = create<StudentState>((set) => ({
    page: 1,
    setPage: (page: number) => set({ page }),
}));


export default StudentStore;
