import { startSchema } from '@/schemas/start-schema';
import { auth } from '@/server/auth';
import { generationMock } from '@/server/mocks/generation-mocks';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // TODO: Implement logic for listing documents
  return NextResponse.json({ message: 'List of documents' });
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = startSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ errors: validatedData.error.flatten().fieldErrors }, { status: 400 });
    }
    
    const mockGeneration = generationMock().create({
      userId: session.user.id,
      prompt: validatedData.data.prompt,
      scope: validatedData.data.scope,
    });

    return NextResponse.json(mockGeneration, { status: 201 });

  } catch (error) {
    console.error('Error in POST /api/v1/documents:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
