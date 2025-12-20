import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // TODO: Implement logic for listing generations
  return NextResponse.json({ message: 'List of generations' });
}

export async function POST(request: Request) {
  // TODO: Implement logic for creating a generation
  return NextResponse.json({ message: 'Generation created' });
}
