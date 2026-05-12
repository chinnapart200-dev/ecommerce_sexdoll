import { NextResponse } from "next/server";
import { logoutUser } from "@/services/auth-service";
import type { ApiResponse } from "@/types/api";

export async function POST() {
  const result = logoutUser();

  const response: ApiResponse<null> = {
    success: true,
    data: null,
    message: "Signed out successfully.",
  };

  const nextResponse = NextResponse.json(response);
  nextResponse.headers.set("Set-Cookie", result.sessionCookie);

  return nextResponse;
}
