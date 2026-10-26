import { NextResponse } from "next/server";
import pdf from "pdf-parse";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please upload a file." },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "The file is empty." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Maximum file size is 10 MB." },
        { status: 413 }
      );
    }

    const name = file.name.toLowerCase();
    let text = "";

    if (name.endsWith(".pdf")) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await pdf(buffer);
      text = result.text;
    } else if (name.endsWith(".txt") || name.endsWith(".md")) {
      text = await file.text();
    } else {
      return NextResponse.json(
        { error: "Only PDF, TXT and MD files are supported." },
        { status: 415 }
      );
    }

    text = text.trim();

    if (!text) {
      return NextResponse.json(
        {
          error:
            "No readable text found. Scanned PDFs need OCR."
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      fileName: file.name,
      characterCount: text.length,
      extractedText: text,
      message: "Text extracted successfully."
    });
  } catch (error) {
    console.error("Extraction error:", error);

    return NextResponse.json(
      { error: "Could not extract text from this file." },
      { status: 500 }
    );
  }
}