import { NextResponse } from "next/server";
import { extractData } from "../genia";
import db from "@/data/db.json";

export async function GET(request, { params }) {
  return NextResponse.json(db);
}

export async function POST(request, { params }) {
  const formData = await request.formData();
  const description = formData.get("description");
  const picture = formData.get("picture");
  return createTransaction(description, picture);
}

async function createTransaction(description, picture) {
  try {
    const result = await extractData(description, picture);
    if(!result.data){
      result.date = new Date().toISOString();
    }
    return NextResponse.json({ transaction: result });
  } catch (error) {
    return new NextResponse({
      status: 500,
      statusText: error.message
    })
  }
}