import Button from "@/Components/Ui/Button/Button";
import Input from "@/Components/Ui/Input/Input";
import Modal from "@/Components/Ui/Modal/Modal";
import { useState } from "react";
import { Teacher } from "../../types/teacherType";

interface TeacherModalProps {
  data?: Teacher;
  isOpen: boolean;
  onClick: (teacher: Teacher) => void;
  onClose: () => void;
}

export default function TeacherModal({ data, isOpen, onClick, onClose }: TeacherModalProps) {
  const [teacher, setTeacher] = useState<Teacher>(
    data || {
      id: 0,
      userId: "",
      fullName: "",
      hireDate: new Date().toISOString().split("T")[0],
      departmentId: 0,
    }
  );

  const isValid = teacher.fullName.trim() !== "" && teacher.hireDate !== "";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={data ? "تعديل بيانات المعلم" : "إضافة معلم جديد"}
      footer={
        <>
          <Button
            disabled={!isValid}
            text="حفظ"
            variant="accent"
            onClick={() => onClick(teacher)}
          />
          <Button text="إلغاء" variant="outline" onClick={onClose} />
        </>
      }
    >
      <Input
        label="الاسم الكامل"
        value={teacher.fullName}
        placeholder="أدخل اسم المعلم"
        onChange={(e) => setTeacher({ ...teacher, fullName: e.target.value })}
      />
      <Input
        label="تاريخ التعيين"
        value={teacher.hireDate ? new Date(teacher.hireDate).toISOString().split("T")[0] : ""}
        type="date"
        onChange={(e) => setTeacher({ ...teacher, hireDate: e.target.value })}
      />
      <Input
        label="رقم القسم"
        value={teacher.departmentId.toString()}
        type="number"
        placeholder="أدخل رقم القسم"
        onChange={(e) => setTeacher({ ...teacher, departmentId: Number(e.target.value) })}
      />
    </Modal>
  );
}
