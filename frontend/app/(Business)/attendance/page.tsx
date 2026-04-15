import AttendanceSection from "@/features/Attendance/Components/AttendanceSection";
import { getAttendance } from "@/features/Attendance/Api/AttendanceApi";

export default async function AttendancePage() {
    const attendance = await getAttendance();

    return (
        <div className="flex flex-col flex-1 pb-[20px]">
            <AttendanceSection allAttendance={attendance.value ?? null} />
        </div>
    );
}
