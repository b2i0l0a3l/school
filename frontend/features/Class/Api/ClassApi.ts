import { fetchApi } from "@/Util/Api/ApiRequest";
import { ApiResponse, PaginatedResponse } from "@/Util/Types/AipResponse";
import { Class } from "../Type/ClassType";

export async function getClasses(): Promise<
  ApiResponse<PaginatedResponse<Class[]>>
> {
  try {
    const result = await fetchApi<PaginatedResponse<Class[]>>(
      `/Class/GetAllClasses?pageNumber=1&pageSize=10`,
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
      message: "class not found",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}

export async function getClassById(
  id: number,
): Promise<ApiResponse<Class | null>> {
  try {
    const result = await fetchApi<Class>(`/Class/GetClassById?ClassId=${id}`, {
      cache: "no-store",
    });

    if (!result.succeeded || !result.value) {
      return {
        message: "Student not found",
        succeeded: false,
        statusCode: 404,
        value: null,
      };
    }
    return {
      message: "Student found",
      succeeded: true,
      statusCode: 200,
      value: result.value,
    };
  } catch (error) {
    return {
      message: "Student not found",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}

export async function deleteStudent(id: number): Promise<ApiResponse<string>> {
  try {
    const result = await fetchApi<string>(`/Student/DeleteStudent?Id=${id}`, {
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
      message: "Student not found",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}
