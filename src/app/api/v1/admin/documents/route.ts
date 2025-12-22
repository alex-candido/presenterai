import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // TODO: Implement logic for listing documents
  return NextResponse.json({ message: 'List of documents' });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: 'List of documents' });
}
