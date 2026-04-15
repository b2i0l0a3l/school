import CourseSection from "@/features/Courses/Components/CourseSection";
import { getCourses } from "@/features/Courses/Api/CourseApi";

export default async function CoursesPage() {
    const courses = await getCourses();

    return (
        <div className="flex flex-col flex-1 pb-[20px]">
            <CourseSection allCourses={courses.value ?? null} />
        </div>
    );
}
