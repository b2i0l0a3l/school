import TeacherSection from "@/features/Teacher/Components/TeacherSection";
import Header from "@/Components/Ui/Header/Header";

export default function TeachersPage() {
    return (
        <div className="flex flex-col flex-1 pb-[20px]">
            <Header title="المعلمين" />
            <TeacherSection />
        </div>
    );
}
