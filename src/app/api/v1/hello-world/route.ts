import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET(request: NextRequest, response: NextResponse) {
  return Response.json("Hello World!");
}
