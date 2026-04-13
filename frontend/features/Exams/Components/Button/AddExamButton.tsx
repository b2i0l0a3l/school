"use client";

import { useState } from "react";
import Button from "@/Components/Ui/Button/Button";
import Input from "@/Components/Ui/Input/Input";
import Modal from "@/Components/Ui/Modal/Modal";
import { Plus } from "lucide-react";

export default function AddExamButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');

    const handleSave = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button
                text="إنشاء امتحان"
                icon={<Plus size={16} />}
                variant="primary"
                onClick={() => setIsOpen(true)}
            />
            
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="إنشاء امتحان جديد"
                footer={
                    <>
                        <Button text="حفظ" variant="accent" onClick={handleSave} disabled={!title || !subject} />
                        <Button text="إلغاء" variant="outline" onClick={() => setIsOpen(false)} />
                    </>
                }
            >
                <Input
                    label="عنوان الامتحان"
                    placeholder="مثال: اختبار منتصف الفصل - رياضيات"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-slate-300">المادة الدراسية</label>
                    <select
                        className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 hover:border-slate-500/50 focus:border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.0)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] rounded-xl text-slate-100 text-sm outline-none transition-all duration-200 cursor-pointer appearance-none"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    >
                        <option value="">اختر المادة</option>
                        <option value="الرياضيات">الرياضيات</option>
                        <option value="الفيزياء">الفيزياء</option>
                        <option value="اللغة العربية">اللغة العربية</option>
                        <option value="التاريخ">التاريخ</option>
                    </select>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input
                            label="تاريخ الانعقاد"
                            type="datetime-local"
                            placeholder=""
                        />
                    </div>
                    <div className="flex-1">
                        <Input
                            label="المدة (بالدقائق)"
                            type="number"
                            placeholder="60"
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}
