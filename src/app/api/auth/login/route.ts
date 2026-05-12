import { NextResponse } from "next/server";
import { loginUser } from "@/services/auth-service";
import type { ApiResponse } from "@/types/api";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const result = await loginUser({
      email: body.email ?? "",
      password: body.password ?? "",
    });

    if (!result.ok) {
      const response: ApiResponse<never> = {
        success: false,
        message: result.message,
        error: result.errors ? JSON.stringify(result.errors) : undefined,
      };

      return NextResponse.json(response, { status: 400 });
    }

    const response: ApiResponse<{
      user: typeof result.data.user;
    }> = {
      success: true,
      data: {
        user: result.data.user,
      },
      message: "Signed in successfully.",
    };

    const nextResponse = NextResponse.json(response);
    nextResponse.headers.set("Set-Cookie", result.data.sessionCookie);

    return nextResponse;
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      message: "Unable to sign in.",
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
