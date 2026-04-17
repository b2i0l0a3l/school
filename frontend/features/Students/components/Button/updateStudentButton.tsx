import { Pencil } from "lucide-react";
import { Student } from "../../types/studentType";
import { useState } from "react";
import StudentModal from "../Modal/StudentModal";
import { updateStudent } from "../../Api/StudentApi";
import useToastStore from "@/Components/Ui/Toast/ToastStore";

export default function UpdateStudentButton({ student }: { student: Student }) {
    const [open, setOpen] = useState(false);
    const toast = useToastStore();
    async function handleUpdate(payload:Student){
        try {
            const result = await updateStudent(payload);
            if (result.succeeded) {
                toast.success(result.message);
                setOpen(false);
            }
            else{
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("حدث خطأ أثناء تحديث الطالب");
        }
    }
  return (
    <>
    <button onClick={()=>setOpen(true)} className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors">
      <Pencil size={15} />
    </button>
    {open && <StudentModal onClose={()=>setOpen(false)}  isOpen={open} data={student} onClick={handleUpdate} />}
    </>
  );
}
