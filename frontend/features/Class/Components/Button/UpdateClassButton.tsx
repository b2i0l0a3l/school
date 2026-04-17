import { Pencil } from "lucide-react";
import { Class } from "../../Type/ClassType";
import { useState } from "react";
import ClassModal from "../Modal/ClassModal";
import { updateClass } from "../../Api/ClassApi";
import useToastStore from "@/Components/Ui/Toast/ToastStore";

export default function UpdateClassButton({ classData }: { classData: Class }) {
    const [open, setOpen] = useState(false);
    const toast = useToastStore();

    async function handleUpdate(payload: Class) {
        try {
            const result = await updateClass(payload);
            if (result.succeeded) {
                toast.success(result.message);
                setOpen(false);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("حدث خطأ أثناء تحديث الفصل");
        }
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors">
                <Pencil size={15} />
            </button>
            {open && <ClassModal onClose={() => setOpen(false)} isOpen={open} data={classData} onClick={handleUpdate} />}
        </>
    );
}
