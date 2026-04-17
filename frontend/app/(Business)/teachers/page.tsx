import TeacherSection from "@/features/Teacher/Components/TeacherSection";
import { getTeachers } from "@/features/Teacher/Api/TeacherApi";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TeachersPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams?.page) || 1;
    const pageSize = 10;

    const teachers = await getTeachers(page, pageSize);

    return (
        <TeacherSection allTeachers={teachers.value ?? null} />
    );
}
