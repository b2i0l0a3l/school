import AttendanceSection from "@/features/Attendance/Components/AttendanceSection";
import Header from "@/Components/Ui/Header/Header";

export default function AttendancePage() {
    return (
        <div className="flex flex-col flex-1 pb-[20px]">
            <Header title="الحضور والغياب" />
            <AttendanceSection />
        </div>
    );
}
