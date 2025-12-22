import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { appCreateGenerationSchema } from "@/schemas/app/generation-schema";
import { auth } from "@/server/auth";
import { appGenerationRepository } from "@/server/db/app/generation-repository";
import { aiMock } from "@/server/mock/app/ai-mock";
import { generationMock } from "@/server/mock/app/generation-mock";

export async function POST(request: Request) {
  try {
    const { generateOutline } = generationMock();
    const { generateAiMetadata } = aiMock();
    const { createWithDocument } = appGenerationRepository();

    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user?.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const json = await request.json();
    const validatedFields = appCreateGenerationSchema.safeParse(json);

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }

    const { prompt, ...rest } = validatedFields.data;

    const initialOutlines = generateOutline(prompt);
    const aiMetadata = generateAiMetadata({
      documentId: "",
      outlineSlidesCount: initialOutlines.length,
    });

    const generation = await createWithDocument(user.id, {
      prompt,
      outlines: initialOutlines,
      ...rest,
      aiMetadata: aiMetadata,
    });

    return NextResponse.json(generation, { status: 201 });
  } catch (error) {
    console.error("[GENERATION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
