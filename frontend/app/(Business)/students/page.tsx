import StudentSection from "@/features/Students/components/studentSection";
import { getStudents } from "@/features/Students/Api/StudentApi";
import { getClasses } from "@/features/Class/Api/ClassApi";


interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StudentsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const pageSize = 3;

  const [students, classes] = await Promise.all([
    getStudents(page, pageSize),
    getClasses(),
  ]);

  return (
    <StudentSection
      allStudents={students.value ?? null}
      initialClasses={classes.value?.items ?? []}
    />
  );
}
