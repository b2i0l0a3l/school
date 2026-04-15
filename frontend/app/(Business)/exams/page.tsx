import ExamSection from "@/features/Exams/Components/ExamSection";
import { getExams } from "@/features/Exams/Api/ExamApi";

export default async function ExamsPage() {
    const exams = await getExams();

    return (
        <div className="flex flex-col flex-1 pb-[20px]">
            <ExamSection allExams={exams.value ?? null} />
        </div>
    );
}
