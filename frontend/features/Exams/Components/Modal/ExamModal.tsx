import Button from "@/Components/Ui/Button/Button";
import Input from "@/Components/Ui/Input/Input";
import Modal from "@/Components/Ui/Modal/Modal";
import { useState } from "react";
import { Exam } from "../../types/examType";

interface ExamModalProps {
  data?: Exam;
  isOpen: boolean;
  onClick: (exam: Exam) => void;
  onClose: () => void;
}

export default function ExamModal({ data, isOpen, onClick, onClose }: ExamModalProps) {
  const [exam, setExam] = useState<Exam>(
    data || {
      id: 0,
      title: "",
      date: new Date().toISOString(),
      subjectId: 0,
      maxScore: 100,
    }
  );

  const isValid = exam.title.trim() !== "" && exam.subjectId > 0 && exam.maxScore > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={data ? "تعديل الامتحان" : "إنشاء امتحان جديد"}
      footer={
        <>
          <Button
            disabled={!isValid}
            text="حفظ"
            variant="accent"
            onClick={() => onClick(exam)}
          />
          <Button text="إلغاء" variant="outline" onClick={onClose} />
        </>
      }
    >
      <Input
        label="عنوان الامتحان"
        value={exam.title}
        placeholder="مثال: اختبار منتصف الفصل - رياضيات"
        onChange={(e) => setExam({ ...exam, title: e.target.value })}
      />
      <Input
        label="رقم المادة"
        value={exam.subjectId.toString()}
        type="number"
        placeholder="أدخل رقم المادة"
        onChange={(e) => setExam({ ...exam, subjectId: Number(e.target.value) })}
      />
      <Input
        label="تاريخ الانعقاد"
        value={exam.date ? new Date(exam.date).toISOString().split("T")[0] : ""}
        type="date"
        onChange={(e) => setExam({ ...exam, date: new Date(e.target.value).toISOString() })}
      />
      <Input
        label="الدرجة العظمى"
        value={exam.maxScore.toString()}
        type="number"
        placeholder="100"
        onChange={(e) => setExam({ ...exam, maxScore: Number(e.target.value) })}
      />
    </Modal>
  );
}
