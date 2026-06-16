import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/betterauth";
import { appCreateGenerationSchema } from "@/schemas/app/generation-schema";
import { appGenerationRepository } from "@/server/db/app/generation-repository";

export async function POST(request: Request) {
  try {
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

    if (validatedFields.data.userId !== user.id) {
      return NextResponse.json({ error: "User ID mismatch" }, { status: 403 });
    }

    const { prompt, ...rest } = validatedFields.data;

    // const generation = await createWithDocument(user.id, {
    //   prompt,
    //   outlines: initialOutlines,
    //   ...rest,
    //   aiMetadata: aiMetadata,
    // });

    return NextResponse.json({ status: 201 });
  } catch (error: any) {
    console.error("[GENERATION_POST]", error);
    // Return a more specific error message if available
    const errorMessage = error.message || "Internal error";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
