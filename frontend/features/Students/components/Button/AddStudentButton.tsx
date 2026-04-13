import Button from "@/Components/Ui/Button/Button";
import { Plus } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { AddStudent } from "../../Api/StudentApi";
import { Student } from "../../types/studentType";
import { CheckForm } from "../Util/CheckForm";
import useToastStore from "@/Components/Ui/Toast/ToastStore";

const StudentModal = dynamic(() => import("../Modal/StudentModal"));


export default function AddStudentButton(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toast = useToastStore();

    const handleAddStudent = async (student: Student) => {
        try{
            if(!CheckForm(student)){
                toast.warning("يرجى ملء جميع الحقول المطلوبة");
                return;
            }
            const result = await AddStudent(student);
            if(result.succeeded){
                toast.success("تمت إضافة الطالب بنجاح");
                setIsModalOpen(false);
            } else {
                toast.error(result.message || "فشل في إضافة الطالب");
            }
        }catch(error){
            toast.error("حدث خطأ غير متوقع");
        }
    };
    return (
        <>
            <Button
                text="إضافة طالب"
                variant="primary"
                icon={<Plus size={18} />}
                onClick={() => setIsModalOpen(true)}
            />
            {isModalOpen && <StudentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onClick={handleAddStudent} /> }
        </>
    );
}