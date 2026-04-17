import usePopupStore from "@/Components/Ui/Popup/PopupStore";
import useToastStore from "@/Components/Ui/Toast/ToastStore";
import { Trash2 } from "lucide-react";
import { deleteExam } from "../../Api/ExamApi";
import { useState } from "react";

export default function DeleteExamButton({ id }: { id: number }) {
    const { showPopup } = usePopupStore();
    const toast = useToastStore();
    const [loading, setLoading] = useState(false);

    function handleDelete() {
        showPopup({
            title: "حذف الامتحان",
            message: "هل أنت متأكد من حذف هذا الامتحان؟",
            type: "danger",
            onConfirm: async () => {
                try {
                    setLoading(true);
                    await deleteExam(id);
                    toast.success("تم حذف الامتحان بنجاح");
                } catch (error) {
                    toast.error("حدث خطأ أثناء حذف الامتحان");
                } finally {
                    setLoading(false);
                }
            },
        });
    }

    return (
        <button disabled={loading} onClick={handleDelete} className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-colors">
            <Trash2 size={15} />
        </button>
    );
}
