import Button from "@/Components/Ui/Button/Button";
import Input from "@/Components/Ui/Input/Input";
import Modal from "@/Components/Ui/Modal/Modal";
import useClassStore from "@/features/Class/Store/ClassStore";
import { useMemo, useState } from "react";
import { Student } from "../../types/studentType";
import { CheckForm } from "../Util/CheckForm";

interface StudentModalProps {
  data?: Student;
  isOpen: boolean;
  onClick: (student: Student) => void;
  onClose: () => void;
}
export default function StudentModal({
  data,
  isOpen,
  onClick,
  onClose,
}: StudentModalProps) {
  const classes = useClassStore((state) => state.classes);

  const classOptions = useMemo(() => {
    const options = Object.values(classes).map((c) => (
      <option key={c.id} value={c.id}>
        {c.className}
      </option>
    ));
    return options;
  }, [classes]);
  const [student, setStudent] = useState<Student>(
    data || {
      id: 0,
      fullName: "",
      dateOfBirth: new Date(),
      gender: 0,
      enrollmentDate: new Date(),
      classId: 0,
    },
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="إضافة طالب جديد"
      footer={
        <>
          <Button
            disabled={!CheckForm(student)}
            text="حفظ"
            variant="accent"
            onClick={() => onClick(student)}
          />
          <Button text="إلغاء" variant="outline" onClick={onClose} />
        </>
      }
    >
      <Input
        label="الاسم الكامل"
        value={student.fullName}
        placeholder="أدخل اسم الطالب"
        onChange={(e) => setStudent({ ...student, fullName: e.target.value })}
      />
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-medium text-slate-300">الجنس</label>
        <select
          className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 hover:border-slate-500/50 focus:border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.0)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] rounded-xl text-slate-100 text-sm outline-none transition-all duration-200 cursor-pointer appearance-none"
          value={student.gender}
          onChange={(e) =>
            setStudent({ ...student, gender: Number(e.target.value) })
          }
        >
          <option value="">اختر الجنس</option>
          <option value={0}>ذكر</option>
          <option value={1}>انثى</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-medium text-slate-300">الصف الدراسي</label>
        <select
          className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 hover:border-slate-500/50 focus:border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.0)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] rounded-xl text-slate-100 text-sm outline-none transition-all duration-200 cursor-pointer appearance-none"
          value={student.classId}
          onChange={(e) =>
            setStudent({ ...student, classId: Number(e.target.value) })
          }
        >
          <option value="">اختر الصف</option>
          {classOptions}
        </select>
      </div>
      <Input
        label="تاريخ الميلاد"
        value={student.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split("T")[0] : ""}
        type="date"
        onChange={(e) =>
          setStudent({ ...student, dateOfBirth: new Date(e.target.value) })
        }
      />
      <Input
        label="تاريخ التسجيل"
        value={student.enrollmentDate ? new Date(student.enrollmentDate).toISOString().split("T")[0] : ""}
        type="date"
        onChange={(e) =>
          setStudent({ ...student, enrollmentDate: new Date(e.target.value) })
        }
      />
    </Modal>
  );
}
