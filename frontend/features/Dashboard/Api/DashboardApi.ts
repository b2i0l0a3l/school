import { fetchApi } from "@/Util/Api/ApiRequest";
import { ApiResponse } from "@/Util/Types/AipResponse";
import {
  DashboardSummary,
  RecentStudent,
  AttendanceStats,
  UpcomingExam,
  GenderDistribution,
  StudentsPerClass,
  TopStudent,
} from "../types/DashboardTypes";

export async function getDashboardSummary(): Promise<ApiResponse<DashboardSummary>> {
  try {
    const result = await fetchApi<DashboardSummary>("/Dashboard/Summary", {
      cache: "no-store",
    });
    return result;
  } catch (error) {
    return {
      message: "Error fetching dashboard summary",
      succeeded: false,
      statusCode: 500,
      value: null,
    };
  }
}

export async function getRecentStudents(count: number = 5): Promise<ApiResponse<RecentStudent[]>> {
  try {
    const result = await fetchApi<RecentStudent[]>(`/Dashboard/RecentStudents?count=${count}`, {
      cache: "no-store",
    });
    return result;
  } catch (error) {
    return {
      message: "Error fetching recent students",
      succeeded: false,
      statusCode: 500,
      value: null,
    };
  }
}

export async function getAttendanceStats(): Promise<ApiResponse<AttendanceStats>> {
  try {
    const result = await fetchApi<AttendanceStats>("/Dashboard/AttendanceStats", {
      cache: "no-store",
    });
    return result;
  } catch (error) {
    return {
      message: "Error fetching attendance stats",
      succeeded: false,
      statusCode: 500,
      value: null,
    };
  }
}

export async function getUpcomingExams(count: number = 5): Promise<ApiResponse<UpcomingExam[]>> {
  try {
    const result = await fetchApi<UpcomingExam[]>(`/Dashboard/UpcomingExams?count=${count}`, {
      cache: "no-store",
    });
    return result;
  } catch (error) {
    return {
      message: "Error fetching upcoming exams",
      succeeded: false,
      statusCode: 500,
      value: null,
    };
  }
}

export async function getGenderDistribution(): Promise<ApiResponse<GenderDistribution>> {
  try {
    const result = await fetchApi<GenderDistribution>("/Dashboard/GenderDistribution", {
      cache: "no-store",
    });
    return result;
  } catch (error) {
    return {
      message: "Error fetching gender distribution",
      succeeded: false,
      statusCode: 500,
      value: null,
    };
  }
}

export async function getStudentsPerClass(): Promise<ApiResponse<StudentsPerClass[]>> {
  try {
    const result = await fetchApi<StudentsPerClass[]>("/Dashboard/StudentsPerClass", {
      cache: "no-store",
    });
    return result;
  } catch (error) {
    return {
      message: "Error fetching students per class",
      succeeded: false,
      statusCode: 500,
      value: null,
    };
  }
}

export async function getTopStudents(count: number = 10): Promise<ApiResponse<TopStudent[]>> {
  try {
    const result = await fetchApi<TopStudent[]>(`/Dashboard/TopStudents?count=${count}`, {
      cache: "no-store",
    });
    return result;
  } catch (error) {
    return {
      message: "Error fetching top students",
      succeeded: false,
      statusCode: 500,
      value: null,
    };
  }
}
