import { getPayload } from "payload";
import configPromise from "@/payload-config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const idRaw = formData.get("id") as string;
    const file = formData.get("file") as File;

    if (!idRaw || !file) {
      return NextResponse.json(
        { error: "id and file are required" },
        { status: 400 }
      );
    }

    const id = parseInt(idRaw, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "id must be a number" },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config: configPromise });

    const buffer = Buffer.from(await file.arrayBuffer());

    const updated = await payload.update({
      collection: "media",
      id,
      data: {},
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
      req: request,
    });

    return NextResponse.json({ success: true, doc: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
