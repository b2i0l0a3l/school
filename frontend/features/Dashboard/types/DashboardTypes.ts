export interface DashboardSummary {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalDepartments: number;
}

export interface RecentStudent {
  id: number;
  fullName: string;
  className: string;
  enrollmentDate: string;
}

export interface AttendanceStats {
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  attendanceRate: number;
}

export interface UpcomingExam {
  id: number;
  title: string;
  subjectName: string;
  date: string;
  maxScore: number;
}

export interface GenderDistribution {
  maleCount: number;
  femaleCount: number;
}

export interface StudentsPerClass {
  classId: number;
  className: string;
  studentCount: number;
}

export interface TopStudent {
  studentId: number;
  fullName: string;
  averageScore: number;
  examCount: number;
}
