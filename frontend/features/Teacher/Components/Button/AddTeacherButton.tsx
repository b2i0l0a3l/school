"use client";

import { useState } from "react";
import Button from "@/Components/Ui/Button/Button";
import { Plus } from "lucide-react";
import TeacherModal from "../Modal/TeacherModal";
import { addTeacher } from "../../Api/TeacherApi";
import { Teacher } from "../../types/teacherType";
import useToastStore from "@/Components/Ui/Toast/ToastStore";

export default function AddTeacherButton() {
    const [isOpen, setIsOpen] = useState(false);
    const toast = useToastStore();

    const handleAdd = async (teacher: Teacher) => {
        try {
            const result = await addTeacher(teacher);
            if (result.succeeded) {
                toast.success("تمت إضافة المعلم بنجاح");
                setIsOpen(false);
            } else {
                toast.error(result.message || "فشل في إضافة المعلم");
            }
        } catch (error) {
            toast.error("حدث خطأ غير متوقع");
        }
    };

    return (
        <>
            <Button
                text="إضافة معلم"
                icon={<Plus size={16} />}
                variant="primary"
                onClick={() => setIsOpen(true)}
            />
            {isOpen && <TeacherModal isOpen={isOpen} onClose={() => setIsOpen(false)} onClick={handleAdd} />}
        </>
    );
}
