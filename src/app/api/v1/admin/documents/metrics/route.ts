import { NextRequest, NextResponse } from "next/server";

async function GET(req: NextRequest) {
  // TODO: Implement documents metrics logic here
  return NextResponse.json({ message: "Documents metrics endpoint" });
}

export { GET };
