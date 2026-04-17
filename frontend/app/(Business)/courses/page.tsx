import CourseSection from "@/features/Courses/Components/CourseSection";
import { getCourses } from "@/features/Courses/Api/CourseApi";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CoursesPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams?.page) || 1;
    const pageSize = 10;

    const courses = await getCourses(page, pageSize);

    return (
        <CourseSection allCourses={courses.value ?? null} />
    );
}
