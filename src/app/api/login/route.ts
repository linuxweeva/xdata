import { DEMO_LOGIN, DEMO_PASSWORD } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email === DEMO_LOGIN && password === DEMO_PASSWORD) {
    const response = NextResponse.json({ message: "ok" }, { status: 200 });

    response.cookies.set("auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { message: "Invalid credentials " },
    { status: 401 },
  );
}
