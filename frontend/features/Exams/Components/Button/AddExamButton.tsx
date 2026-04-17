"use client";

import { useState } from "react";
import Button from "@/Components/Ui/Button/Button";
import { Plus } from "lucide-react";
import ExamModal from "../Modal/ExamModal";
import { addExam } from "../../Api/ExamApi";
import { Exam } from "../../types/examType";
import useToastStore from "@/Components/Ui/Toast/ToastStore";

export default function AddExamButton() {
    const [isOpen, setIsOpen] = useState(false);
    const toast = useToastStore();

    const handleAdd = async (exam: Exam) => {
        try {
            const result = await addExam(exam);
            if (result.succeeded) {
                toast.success("تم إنشاء الامتحان بنجاح");
                setIsOpen(false);
            } else {
                toast.error(result.message || "فشل في إنشاء الامتحان");
            }
        } catch (error) {
            toast.error("حدث خطأ غير متوقع");
        }
    };

    return (
        <>
            <Button
                text="إنشاء امتحان"
                icon={<Plus size={16} />}
                variant="primary"
                onClick={() => setIsOpen(true)}
            />
            {isOpen && <ExamModal isOpen={isOpen} onClose={() => setIsOpen(false)} onClick={handleAdd} />}
        </>
    );
}
