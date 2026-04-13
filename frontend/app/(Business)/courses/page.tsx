import CourseSection from "@/features/Courses/Components/CourseSection";
import Header from "@/Components/Ui/Header/Header";

export default function CoursesPage() {
    return (
        <div className="flex flex-col flex-1 pb-[20px]">
            <Header title="المناهج الدراسية" />
            <CourseSection />
        </div>
    );
}
