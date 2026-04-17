import Button from "@/Components/Ui/Button/Button";
import Input from "@/Components/Ui/Input/Input";
import Modal from "@/Components/Ui/Modal/Modal";
import { useState } from "react";
import { Course } from "../../types/courseType";

interface CourseModalProps {
  data?: Course;
  isOpen: boolean;
  onClick: (course: Course) => void;
  onClose: () => void;
}

export default function CourseModal({ data, isOpen, onClick, onClose }: CourseModalProps) {
  const [course, setCourse] = useState<Course>(
    data || {
      id: 0,
      subjectName: "",
      creatAt: new Date().toISOString(),
    }
  );

  const isValid = course.subjectName.trim() !== "";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={data ? "تعديل المنهج" : "إضافة منهج جديد"}
      footer={
        <>
          <Button
            disabled={!isValid}
            text="حفظ"
            variant="accent"
            onClick={() => onClick(course)}
          />
          <Button text="إلغاء" variant="outline" onClick={onClose} />
        </>
      }
    >
      <Input
        label="اسم المنهج"
        value={course.subjectName}
        placeholder="أدخل اسم المنهج الدراسي"
        onChange={(e) => setCourse({ ...course, subjectName: e.target.value })}
      />
    </Modal>
  );
}
