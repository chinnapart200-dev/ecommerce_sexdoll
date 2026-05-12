import { NextResponse } from "next/server";
import { registerUser } from "@/services/auth-service";
import type { ApiResponse } from "@/types/api";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      phone?: string;
    };

    const result = await registerUser({
      firstName: body.firstName ?? "",
      lastName: body.lastName ?? "",
      email: body.email ?? "",
      password: body.password ?? "",
      confirmPassword: body.confirmPassword ?? "",
      phone: body.phone ?? "",
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
      message: "Account created successfully.",
    };

    const nextResponse = NextResponse.json(response, { status: 201 });
    nextResponse.headers.set("Set-Cookie", result.data.sessionCookie);

    return nextResponse;
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      message: "Unable to create account.",
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
