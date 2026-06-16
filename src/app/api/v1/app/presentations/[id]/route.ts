import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { appUpdatePresentationSchema } from '@/schemas/app/presentation-schema';
import { auth } from '@/server/auth';
import { appPresentationRepository } from '@/server/db/app/presentation-repository';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { find } = appPresentationRepository();

    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user?.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const presentation = await find(params.id, user.id);

    if (!presentation) {
      return NextResponse.json({ error: 'Presentation not found' }, { status: 404 });
    }

    return NextResponse.json(presentation);
  } catch (error) {
    console.error('[PRESENTATION_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { update } = appPresentationRepository();

    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user?.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const json = await req.json();
    const validatedFields = appUpdatePresentationSchema.safeParse(json);

    if (!validatedFields.success) {
      return NextResponse.json({ error: 'Invalid fields' }, { status: 400 });
    }

    const updatedPresentation = await update(
      params.id,
      user.id,
      validatedFields.data as any
    );

    return NextResponse.json(updatedPresentation);
  } catch (error) {
    console.error('[PRESENTATION_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}