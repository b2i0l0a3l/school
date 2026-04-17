import { Pencil } from "lucide-react";
import { Course } from "../../types/courseType";
import { useState } from "react";
import CourseModal from "../Modal/CourseModal";
import { updateCourse } from "../../Api/CourseApi";
import useToastStore from "@/Components/Ui/Toast/ToastStore";

export default function UpdateCourseButton({ course }: { course: Course }) {
    const [open, setOpen] = useState(false);
    const toast = useToastStore();

    async function handleUpdate(payload: Course) {
        try {
            const result = await updateCourse(payload);
            if (result.succeeded) {
                toast.success(result.message);
                setOpen(false);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("حدث خطأ أثناء تحديث المنهج");
        }
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors">
                <Pencil size={15} />
            </button>
            {open && <CourseModal onClose={() => setOpen(false)} isOpen={open} data={course} onClick={handleUpdate} />}
        </>
    );
}
