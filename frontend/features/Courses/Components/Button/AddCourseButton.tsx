"use client";

import { useState } from "react";
import Button from "@/Components/Ui/Button/Button";
import Input from "@/Components/Ui/Input/Input";
import Modal from "@/Components/Ui/Modal/Modal";
import { Plus } from "lucide-react";

export default function AddCourseButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');

    const handleSave = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button
                text="إضافة منهج"
                icon={<Plus size={16} />}
                variant="primary"
                onClick={() => setIsOpen(true)}
            />
            
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="إضافة منهج دراسي جديد"
                footer={
                    <>
                        <Button text="حفظ" variant="accent" onClick={handleSave} disabled={!title || !code} />
                        <Button text="إلغاء" variant="outline" onClick={() => setIsOpen(false)} />
                    </>
                }
            >
                <Input
                    label="رمز المنهج"
                    placeholder="مثال: MATH101"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <Input
                    label="اسم المنهج"
                    placeholder="أدخل اسم المنهج الدراسي"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    label="الساعات المعتمدة"
                    type="number"
                    placeholder="3"
                />
            </Modal>
        </>
    );
}
