import StudentSection from "@/features/Students/components/studentSection";
import { getStudents } from "@/features/Students/Api/StudentApi";
import { getClasses } from "@/features/Class/Api/ClassApi";


export default async function StudentsPage() {
  const [students, classes] = await Promise.all([
    getStudents(1, 3),
    getClasses(),
  ]);

  return (
    <StudentSection
      allStudents={students.value ?? null}
      initialClasses={classes.value?.items ?? []}
    />
  );
}
