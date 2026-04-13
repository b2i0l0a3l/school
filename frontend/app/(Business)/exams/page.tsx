import ExamSection from "@/features/Exams/Components/ExamSection";
import Header from "@/Components/Ui/Header/Header";

export default function ExamsPage() {
    return (
        <div className="flex flex-col flex-1 pb-[20px]">
            <Header title="الامتحانات" />
            <ExamSection />
        </div>
    );
}
