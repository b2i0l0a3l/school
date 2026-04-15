"use client";

import Header from "@/Components/Ui/Header/Header";
import dynamic from "next/dynamic";

// Dynamic imports for performance (lazy loading client components)
const DashboardStats = dynamic(
    () => import("@/features/Dashboard/components/DashboardStats"),
    { ssr: false, loading: () => <div className="h-32 rounded-2xl bg-slate-800/50 animate-pulse col-span-1 md:col-span-2 lg:col-span-4" /> }
);

const RecentStudentsTable = dynamic(
    () => import("@/features/Dashboard/components/RecentStudentsTable"),
    { ssr: false, loading: () => <div className="h-96 rounded-2xl bg-slate-800/50 animate-pulse" /> }
);

const UpcomingExamsList = dynamic(
    () => import("@/features/Dashboard/components/UpcomingExamsList"),
    { ssr: false, loading: () => <div className="h-96 rounded-2xl bg-slate-800/50 animate-pulse" /> }
);

export default function DashboardPage() {
    return (
        <div className="flex-1 flex flex-col min-h-screen text-slate-200">
            <Header title="لوحة القيادة" />

            <div className="flex-1 p-8 flex flex-col gap-6">
                {/* Stats */}
                <DashboardStats />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
                    {/* Recent Students Table */}
                    <RecentStudentsTable />

                    {/* Upcoming Exams */}
                    <UpcomingExamsList />
                </div>
            </div>
        </div>
    );
}
