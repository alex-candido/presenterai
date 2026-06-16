import { headers } from "next/headers";
import { NextResponse } from "next/server";
import slugify from 'slugify';

import { Outlines } from '@/schemas/app/generation-schema';
import { appCreatePresentationSchema } from '@/schemas/app/presentation-schema';
import { auth } from '@/server/auth';
import { appGenerationRepository } from "@/server/db/app/generation-repository";
import { appPresentationRepository } from '@/server/db/app/presentation-repository';
import { aiMock } from "@/server/mock/app/ai-mock";
import { generateMockedSlidesFromOutlines } from '@/server/mock/app/presentation-mock';

export async function POST(request: Request) {
  try {
    const { find } = appGenerationRepository();
    const { create } = appPresentationRepository();
    const { generateAiMetadata } = aiMock();

    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user?.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const json = await request.json();
    const validatedFields = appCreatePresentationSchema.safeParse(json);

    if (!validatedFields.success) {
      return NextResponse.json({ error: 'Invalid fields' }, { status: 400 });
    }

    const { generationId } = validatedFields.data;

    const generation = await find(generationId, user.id);

    if (!generation) {
      return NextResponse.json(
        { error: 'Source generation not found' },
        { status: 404 }
      );
    }

    const slides = generateMockedSlidesFromOutlines(
      generation.outlines as Outlines
    );

    const aiMetadata = generateAiMetadata({
        documentId: generation.documentId,
        outlineSlidesCount: slides.length,
    });

    const slug = slugify(generation.prompt.substring(0, 50), {
      lower: true,
      strict: true,
    })

    const newPresentation = await create({
      user: { connect: { id: user.id } },
      generation: { connect: { id: generationId } },
      slides: JSON.parse(JSON.stringify(slides)),
      slug: slug,
      aiMetadata: aiMetadata,
    });

    return NextResponse.json(newPresentation, { status: 201 });
  } catch (error) {
    console.error('[PRESENTATION_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}