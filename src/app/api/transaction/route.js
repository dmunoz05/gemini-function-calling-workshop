import { NextResponse } from "next/server";
import db from "@/data/db.json";
import { extractData } from "../genia";

export async function GET() {
  return NextResponse.json(db);
}

export async function POST(request) {
  const formData = await request.formData();
  console.log(formData);
  const description = formData.get("description");
  const picture = formData.get("picture");

  await createTransaction(description, picture);

  return NextResponse.json({});
}

async function createTransaction(description, picture) {
  try {
    const result = await extractData(description, picture);

    console.log(result);
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
      statusText: error.message,
    });
  }
}
