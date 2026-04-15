import TeacherSection from "@/features/Teacher/Components/TeacherSection";
import { getTeachers } from "@/features/Teacher/Api/TeacherApi";

export default async function TeachersPage() {
    const teachers = await getTeachers();

    return (
        <div className="flex flex-col flex-1 pb-[20px]">
            <TeacherSection allTeachers={teachers.value ?? null} />
        </div>
    );
}
