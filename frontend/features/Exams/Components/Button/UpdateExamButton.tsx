import { Pencil } from "lucide-react";
import { Exam } from "../../types/examType";
import { useState } from "react";
import ExamModal from "../Modal/ExamModal";
import { updateExam } from "../../Api/ExamApi";
import useToastStore from "@/Components/Ui/Toast/ToastStore";

export default function UpdateExamButton({ exam }: { exam: Exam }) {
    const [open, setOpen] = useState(false);
    const toast = useToastStore();

    async function handleUpdate(payload: Exam) {
        try {
            const result = await updateExam(payload);
            if (result.succeeded) {
                toast.success(result.message);
                setOpen(false);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("حدث خطأ أثناء تحديث الامتحان");
        }
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors">
                <Pencil size={15} />
            </button>
            {open && <ExamModal onClose={() => setOpen(false)} isOpen={open} data={exam} onClick={handleUpdate} />}
        </>
    );
}
