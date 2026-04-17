import { fetchApi } from "@/Util/Api/ApiRequest";
import { ApiResponse } from "@/Util/Types/AipResponse";
import { LoginResponse } from "../type/LoginType";

export async function login(email: string, password: string): Promise<
  ApiResponse<LoginResponse>
> {
  try {
    const result = await fetchApi<LoginResponse>(
      `/Auth/Login`,
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
      value: result.value,
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
      