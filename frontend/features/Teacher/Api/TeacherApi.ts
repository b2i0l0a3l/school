import { fetchApi } from "@/Util/Api/ApiRequest";
import { ApiResponse, PaginatedResponse } from "@/Util/Types/AipResponse";
import { Teacher } from "../types/teacherType";

export async function getTeachers(pageNumber: number = 1, pageSize: number = 10): Promise<
  ApiResponse<PaginatedResponse<Teacher[]>>
> {
  try {
    const result = await fetchApi<PaginatedResponse<Teacher[]>>(
      `/Teacher/GetAllTeachers?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
      message: "Teachers not found",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}

export async function getTeacherById(
  id: number,
): Promise<ApiResponse<Teacher | null>> {
  try {
    const result = await fetchApi<Teacher>(`/Teacher/GetTeacherById?TeacherId=${id}`, {
      cache: "no-store",
    });

    if (!result.succeeded || !result.value) {
      return {
        message: "Teacher not found",
        succeeded: false,
        statusCode: 404,
        value: null,
      };
    }
    return {
      message: "Teacher found",
      succeeded: true,
      statusCode: 200,
      value: result.value,
    };
  } catch (error) {
    return {
      message: "Teacher not found",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}

export async function deleteTeacher(id: number): Promise<ApiResponse<string>> {
  try {
    const result = await fetchApi<string>(`/Teacher/DeleteTeacher?Id=${id}`, {
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
      message: "Teacher not found",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}

export async function addTeacher(teacher: Teacher): Promise<ApiResponse<Teacher>> {
  try {
    const result = await fetchApi<Teacher>(`/Teacher/AddNewTeacher`, {
      method: "POST",
      body: JSON.stringify(teacher),
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
      message: "Teacher not added",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}

export async function updateTeacher(teacher: Teacher): Promise<ApiResponse<Teacher>> {
  try {
    const result = await fetchApi<Teacher>(`/Teacher/UpdateTeacher?Id=${teacher.id}`, {
      method: "PUT",
      body: JSON.stringify(teacher),
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
      message: "Teacher not updated",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}
