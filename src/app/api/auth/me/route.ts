import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCurrentUserFromSessionToken } from "@/services/auth-service";
import { SESSION_COOKIE_NAME } from "@/lib/session";
import type { ApiResponse } from "@/types/api";
import type { PublicUser } from "@/types/user";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value ?? "";

    if (!token) {
      const response: ApiResponse<never> = {
        success: false,
        message: "Not authenticated.",
      };

      return NextResponse.json(response, { status: 401 });
    }

    const user = await getCurrentUserFromSessionToken(token);

    if (!user) {
      const response: ApiResponse<never> = {
        success: false,
        message: "Not authenticated.",
      };

      return NextResponse.json(response, { status: 401 });
    }

    const response: ApiResponse<{
      user: PublicUser;
    }> = {
      success: true,
      data: {
        user,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      message: "Unable to load current user.",
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
