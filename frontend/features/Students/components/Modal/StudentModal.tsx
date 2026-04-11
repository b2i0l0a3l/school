import Button from "@/Components/Ui/Button/Button";
import Input from "@/Components/Ui/Input/Input";
import Modal from "@/Components/Ui/Modal/Modal";


interface StudentModalProps {
    isOpen : boolean;
    onClick : () => void;
    onClose : ()=> void;
}
export default function StudentModal({isOpen, onClick, onClose} : StudentModalProps ){
    return (
 <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="إضافة طالب جديد"
                footer={
                    <>
                        <Button text="حفظ" variant="accent" onClick={onClick} />
                        <Button text="إلغاء" variant="outline" onClick={onClick} />
                    </>
                }
            >
                <Input label="الاسم الكامل" placeholder="أدخل اسم الطالب" />
                <Input label="البريد الإلكتروني" type="email" placeholder="example@school.com" />
                <Input label="رقم الهاتف" type="tel" placeholder="05X XXX XXXX" />
                <div className="input-group">
                    <label className="input-label">الصف الدراسي</label>
                    <select className="select">
                        <option value="">اختر الصف</option>
                        <option value="9">الصف التاسع</option>
                        <option value="10">الصف العاشر</option>
                        <option value="11">الصف الحادي عشر</option>
                        <option value="12">الصف الثاني عشر</option>
                    </select>
                </div>
                <Input label="تاريخ الميلاد" type="date" />
            </Modal>
    );
}