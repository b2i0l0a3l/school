import { fetchApi } from "@/Util/Api/ApiRequest";
import { ApiResponse, PaginatedResponse } from "@/Util/Types/AipResponse";
import { Exam } from "../types/examType";

export async function getExams(pageNumber: number = 1, pageSize: number = 10): Promise<
  ApiResponse<PaginatedResponse<Exam[]>>
> {
  try {
    const result = await fetchApi<PaginatedResponse<Exam[]>>(
      `/Exam/GetAll?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
      message: "Exams not found",
      succeeded: false,
      statusCode: 404,
      value: null,
    };
  }
}
