"use client";

import { useState } from "react";
import Button from "@/Components/Ui/Button/Button";
import { Plus } from "lucide-react";
import ClassModal from "../Modal/ClassModal";
import { addClass } from "../../Api/ClassApi";
import { Class } from "../../Type/ClassType";
import useToastStore from "@/Components/Ui/Toast/ToastStore";

export default function AddClassButton() {
    const [isOpen, setIsOpen] = useState(false);
    const toast = useToastStore();

    const handleAdd = async (classData: Class) => {
        try {
            const result = await addClass(classData);
            if (result.succeeded) {
                toast.success("تمت إضافة الفصل بنجاح");
                setIsOpen(false);
            } else {
                toast.error(result.message || "فشل في إضافة الفصل");
            }
        } catch (error) {
            toast.error("حدث خطأ غير متوقع");
        }
    };

    return (
        <>
            <Button
                text="إضافة فصل"
                icon={<Plus size={16} />}
                variant="primary"
                onClick={() => setIsOpen(true)}
            />
            {isOpen && <ClassModal isOpen={isOpen} onClose={() => setIsOpen(false)} onClick={handleAdd} />}
        </>
    );
}
