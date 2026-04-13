"use client";

import { useState } from "react";
import Button from "@/Components/Ui/Button/Button";
import Input from "@/Components/Ui/Input/Input";
import Modal from "@/Components/Ui/Modal/Modal";
import { Plus } from "lucide-react";

export default function AddTeacherButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');

    const handleSave = () => {
        setIsOpen(false);
        // Will dispatch to backend or state management
    };

    return (
        <>
            <Button
                text="إضافة معلم"
                icon={<Plus size={16} />}
                variant="primary"
                onClick={() => setIsOpen(true)}
            />
            
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="إضافة معلم جديد"
                footer={
                    <>
                        <Button text="حفظ" variant="accent" onClick={handleSave} disabled={!name || !subject} />
                        <Button text="إلغاء" variant="outline" onClick={() => setIsOpen(false)} />
                    </>
                }
            >
                <Input
                    label="الاسم الكامل"
                    placeholder="أدخل اسم المعلم"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="البريد الإلكتروني"
                    placeholder="example@school.com"
                    type="email"
                />
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-slate-300">التخصص الدراسي</label>
                    <select
                        className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 hover:border-slate-500/50 focus:border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.0)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] rounded-xl text-slate-100 text-sm outline-none transition-all duration-200 cursor-pointer appearance-none"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    >
                        <option value="">اختر التخصص</option>
                        <option value="الرياضيات">الرياضيات</option>
                        <option value="العلوم">العلوم</option>
                        <option value="اللغة العربية">اللغة العربية</option>
                        <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
                    </select>
                </div>
            </Modal>
        </>
    );
}
