
import { NextRequest, NextResponse } from "next/server";

async function GET(req: NextRequest) {
  // TODO: Implement users metrics logic here
  return NextResponse.json({ message: "Users metrics endpoint" });
}

export { GET };
