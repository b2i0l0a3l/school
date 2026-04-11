import Button from "@/Components/Ui/Button/Button";
import { Plus } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

const StudentModal = dynamic(() => import("../Modal/StudentModal"));

export default function AddStudentButton(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <>
            <Button
                text="إضافة طالب"
                variant="primary"
                icon={<Plus size={18} />}
                onClick={() => setIsModalOpen(true)}
            />
            {isModalOpen && <StudentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onClick={()=> console.log("Ex") } /> }
        </>
    );
}