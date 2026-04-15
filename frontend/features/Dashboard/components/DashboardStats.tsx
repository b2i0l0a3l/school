"use client";

import { useEffect, useState } from "react";
import StatCard from "@/Components/Ui/Card/StatCard";
import { Users, GraduationCap, BookOpen, ClipboardCheck } from "lucide-react";
import { getDashboardSummary, getAttendanceStats } from "../Api/DashboardApi";
import { DashboardSummary, AttendanceStats } from "../types/DashboardTypes";

export default function DashboardStats() {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [attendanceStats, setAttendanceStats] = useState<AttendanceStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const [summaryRes, attendanceRes] = await Promise.all([
                    getDashboardSummary(),
                    getAttendanceStats()
                ]);

                if (summaryRes.succeeded && summaryRes.value) {
                    setSummary(summaryRes.value);
                }
                if (attendanceRes.succeeded && attendanceRes.value) {
                    setAttendanceStats(attendanceRes.value);
                }
            } catch (error) {
                console.error("Failed to load dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
                label="إجمالي الطلاب"
                value={loading ? "..." : summary?.totalStudents || 0}
                icon={<Users size={22} />}
                iconColor="indigo"
            />
            <StatCard
                label="إجمالي المعلمين"
                value={loading ? "..." : summary?.totalTeachers || 0}
                icon={<GraduationCap size={22} />}
                iconColor="teal"
            />
            <StatCard
                label="إجمالي الكورسات"
                value={loading ? "..." : summary?.totalCourses || 0}
                icon={<BookOpen size={22} />}
                iconColor="emerald"
            />
            <StatCard
                label="نسبة الحضور اليوم"
                value={loading ? "..." : `${attendanceStats?.attendanceRate || 0}%`}
                icon={<ClipboardCheck size={22} />}
                iconColor="amber"
            />
        </div>
    );
}
