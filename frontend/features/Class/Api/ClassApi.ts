import { fetchApi } from "@/Util/Api/ApiRequest";
import { ApiResponse, PaginatedResponse } from "@/Util/Types/AipResponse";
import { Class } from "../Type/ClassType";

export async function getClasses(pageNumber: number = 1, pageSize: number = 100): Promise<
  ApiResponse<PaginatedResponse<Class[]>>
> {
  try {
    const result = await fetchApi<PaginatedResponse<Class[]>>(
      `/Class/GetAllClasses?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
      message: "Classes not found",
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
        message: "Class not found",
        succeeded: false,
        statusCode: 404,
        value: null,
      };
    }
    return {
      message: "Class found",
      succeeded: true,
      statusCode: 200,
      value: result.value,
    };
  } catch (error) {
    return {
      message: "Class not found",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}

export async function addClass(classData: Class): Promise<ApiResponse<Class>> {
  try {
    const result = await fetchApi<Class>(`/Class/AddNewClass`, {
      method: "POST",
      body: JSON.stringify(classData),
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
      message: "Class not added",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}

export async function updateClass(classData: Class): Promise<ApiResponse<Class>> {
  try {
    const result = await fetchApi<Class>(`/Class/UpdateClass?Id=${classData.id}`, {
      method: "PUT",
      body: JSON.stringify(classData),
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
      message: "Class not updated",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}

export async function deleteClass(id: number): Promise<ApiResponse<string>> {
  try {
    const result = await fetchApi<string>(`/Class/DeleteClass?Id=${id}`, {
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
      message: "Class not deleted",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}
