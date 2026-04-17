import { fetchApi } from "@/Util/Api/ApiRequest";
import { ApiResponse } from "@/Util/Types/AipResponse";

export async function Register(email: string, password: string): Promise<
  ApiResponse<boolean>
> {
  try {
    const result = await fetchApi<boolean>(
      `/Auth/Register`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
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
      value: true,
    };
  } catch (error) {
    return {
      message: "Login failed",
      succeeded: false,
      statusCode: 401,
      value: null,
    };
  }
}
      