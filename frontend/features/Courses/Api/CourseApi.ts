import { fetchApi } from "@/Util/Api/ApiRequest";
import { ApiResponse, PaginatedResponse } from "@/Util/Types/AipResponse";
import { Course } from "../types/courseType";

export async function getCourses(pageNumber: number = 1, pageSize: number = 10): Promise<
  ApiResponse<PaginatedResponse<Course[]>>
> {
  try {
    const result = await fetchApi<PaginatedResponse<Course[]>>(
      `/Subject/GetAllSubjects?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        cache: "no-store",
      },
    );
    if (!result.succeeded || !result.value) {
      return {
        message: result.message,
        succeeded: false,
        statusCode: result.statusCode,
        value: null,
      };
    }
    return {
      message: result.message,
      succeeded: true,
      statusCode: result.statusCode,
      value: result.value,
    };
  } catch (error) {
    return {
      message: "Courses not found",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}

export async function addCourse(course: Course): Promise<ApiResponse<Course>> {
  try {
    const result = await fetchApi<Course>(`/Subject/AddNewSubject`, {
      method: "POST",
      body: JSON.stringify(course),
      cache: "no-store",
    });
    if (!result.succeeded || !result.value) {
      return {
        message: result.message,
        succeeded: false,
        statusCode: result.statusCode,
        value: null,
      };
    }
    return {
      message: result.message,
      succeeded: true,
      statusCode: result.statusCode,
      value: result.value,
    };
  } catch (error) {
    return {
      message: "Course not added",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}

export async function updateCourse(course: Course): Promise<ApiResponse<Course>> {
  try {
    const result = await fetchApi<Course>(`/Subject/UpdateSubject?Id=${course.id}`, {
      method: "PUT",
      body: JSON.stringify(course),
      cache: "no-store",
    });
    if (!result.succeeded || !result.value) {
      return {
        message: result.message,
        succeeded: false,
        statusCode: result.statusCode,
        value: null,
      };
    }
    return {
      message: result.message,
      succeeded: true,
      statusCode: result.statusCode,
      value: result.value,
    };
  } catch (error) {
    return {
      message: "Course not updated",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}

export async function deleteCourse(id: number): Promise<ApiResponse<string>> {
  try {
    const result = await fetchApi<string>(`/Subject/DeleteSubject?Id=${id}`, {
      method: "DELETE",
    });
    if (!result.succeeded) {
      return {
        message: result.message,
        succeeded: false,
        statusCode: result.statusCode,
        value: null,
      };
    }
    return {
      message: result.message,
      succeeded: true,
      statusCode: result.statusCode,
      value: result.value,
    };
  } catch (error) {
    return {
      message: "Course not deleted",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}
