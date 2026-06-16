import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // TODO: Implement logic for listing users
  return NextResponse.json({ message: 'List of users' });
}

export async function POST(request: Request) {
  // TODO: Implement logic for creating a user
  return NextResponse.json({ message: 'User created' });
}
