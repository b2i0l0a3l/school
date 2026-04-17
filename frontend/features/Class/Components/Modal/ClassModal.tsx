import Button from "@/Components/Ui/Button/Button";
import Input from "@/Components/Ui/Input/Input";
import Modal from "@/Components/Ui/Modal/Modal";
import { useState } from "react";
import { Class } from "../../Type/ClassType";

interface ClassModalProps {
  data?: Class;
  isOpen: boolean;
  onClick: (classData: Class) => void;
  onClose: () => void;
}

export default function ClassModal({ data, isOpen, onClick, onClose }: ClassModalProps) {
  const [classData, setClassData] = useState<Class>(
    data || {
      id: 0,
      className: "",
      year: new Date().getFullYear(),
    }
  );

  const isValid = classData.className.trim() !== "" && classData.year > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={data ? "تعديل الفصل" : "إضافة فصل جديد"}
      footer={
        <>
          <Button
            disabled={!isValid}
            text="حفظ"
            variant="accent"
            onClick={() => onClick(classData)}
          />
          <Button text="إلغاء" variant="outline" onClick={onClose} />
        </>
      }
    >
      <Input
        label="اسم الفصل"
        value={classData.className}
        placeholder="مثال: الصف الأول أ"
        onChange={(e) => setClassData({ ...classData, className: e.target.value })}
      />
      <Input
        label="السنة الدراسية"
        value={classData.year.toString()}
        type="number"
        placeholder="2026"
        onChange={(e) => setClassData({ ...classData, year: Number(e.target.value) })}
      />
    </Modal>
  );
}
