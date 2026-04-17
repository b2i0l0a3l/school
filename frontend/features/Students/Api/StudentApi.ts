import { fetchApi } from "@/Util/Api/ApiRequest";
import { ApiResponse, PaginatedResponse } from "@/Util/Types/AipResponse";
import { Student } from "../types/studentType";

export async function getStudents(pageNumber: number, pageSize: number): Promise<
  ApiResponse<PaginatedResponse<Student[]>>
> {
  try {
    const result = await fetchApi<PaginatedResponse<Student[]>>(
      `/Student/GetAllStudents?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
      message: "Student not found",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}


export async function AddStudent(student: Student): Promise<
  ApiResponse<Student>
> {
  try {
    const result = await fetchApi<Student>(
      `/Student/AddNewStudent`,
      {
        method: "POST",
        body: JSON.stringify(student),
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
      message: "Student not added",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}

export async function getStudentById(
  id: number,
): Promise<ApiResponse<Student | null>> {
  try {
    const result = await fetchApi<Student>(`/Student/GetStudentById?StudentId=${id}`, {
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

export async function updateStudent(student: Student): Promise<
  ApiResponse<Student>
> {
  try {
    const result = await fetchApi<Student>(
      `/Student/UpdateStudent?Id=${student.id}`,
      {
        method: "PUT",
        body: JSON.stringify(student),
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
      message: "Student not updated",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}