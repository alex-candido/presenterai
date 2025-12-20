import { NextRequest, NextResponse } from "next/server";

async function GET(req: NextRequest) {
  // TODO: Implement generations metrics logic here
  return NextResponse.json({ message: "Generations metrics endpoint" });
}

export { GET };
