export enum AttendanceStatus {
    Present = 1,
    Absent = 2,
    Late = 3
}

export type Attendance = {
    id: number;
    studentId: number;
    studentName?: string;
    class?: string;
    date: string;
    status: AttendanceStatus;
    remarks: string;
};
