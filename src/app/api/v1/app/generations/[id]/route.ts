import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { appUpdateGenerationSchema } from '@/schemas/app/generation-schema';
import { auth } from '@/server/auth';
import { appGenerationRepository } from '@/server/db/app/generation-repository';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { find } = appGenerationRepository();

    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user?.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }

    const generation = await find(params.id, user.id);

    if (!generation) {
      return NextResponse.json({ error: 'Generation not found' }, { status: 404 });
    }

    return NextResponse.json(generation);
  } catch (error) {
    console.error('[GENERATION_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { update } = appGenerationRepository();
    
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user?.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }

    const json = await req.json();
    const validatedFields = appUpdateGenerationSchema.safeParse(json);

    if (!validatedFields.success) {
      return NextResponse.json({ error: 'Invalid fields' }, { status: 400 });
    }

    const updatedGeneration = await update(
      params.id,
      user.id,
      validatedFields.data
    );

    return NextResponse.json(updatedGeneration);
  } catch (error) {
    console.error('[GENERATION_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}