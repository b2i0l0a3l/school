import ExamSection from "@/features/Exams/Components/ExamSection";
import { getExams } from "@/features/Exams/Api/ExamApi";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ExamsPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams?.page) || 1;
    const pageSize = 10;

    const exams = await getExams(page, pageSize);

    return (
        <ExamSection allExams={exams.value ?? null} />
    );
}
