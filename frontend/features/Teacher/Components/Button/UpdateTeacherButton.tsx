import { Pencil } from "lucide-react";
import { Teacher } from "../../types/teacherType";
import { useState } from "react";
import TeacherModal from "../Modal/TeacherModal";
import { updateTeacher } from "../../Api/TeacherApi";
import useToastStore from "@/Components/Ui/Toast/ToastStore";

export default function UpdateTeacherButton({ teacher }: { teacher: Teacher }) {
    const [open, setOpen] = useState(false);
    const toast = useToastStore();

    async function handleUpdate(payload: Teacher) {
        try {
            const result = await updateTeacher(payload);
            if (result.succeeded) {
                toast.success(result.message);
                setOpen(false);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("حدث خطأ أثناء تحديث بيانات المعلم");
        }
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors">
                <Pencil size={15} />
            </button>
            {open && <TeacherModal onClose={() => setOpen(false)} isOpen={open} data={teacher} onClick={handleUpdate} />}
        </>
    );
}
