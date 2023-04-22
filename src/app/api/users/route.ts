import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const req = NextRequest;
  const res = NextResponse;
  const next = NextResponse.next();
  return NextResponse.json({ name: "carlos", idade: "30" });
}
