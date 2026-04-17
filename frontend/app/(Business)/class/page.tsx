import ClassSection from "@/features/Class/Components/ClassSection";
import { getClasses } from "@/features/Class/Api/ClassApi";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ClassPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams?.page) || 1;
    const pageSize = 10;

    const classes = await getClasses(page, pageSize);

    return (
        <ClassSection allClasses={classes.value ?? null} />
    );
}
