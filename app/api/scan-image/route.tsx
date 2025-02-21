import { NextResponse } from "next/server";
import {findIngredients} from "./scan.js";


export async function POST(req: Request) {
  try {
    const { image, description } = await req.json();

    if (!image || !description) {
      return NextResponse.json({ error: "Image and description are required" }, { status: 400 });
    }

    const deduced_info = await findIngredients();

    const scanned = deduced_info.response.text();
    return NextResponse.json(scanned, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to identify meal in image" }, { status: 500 });
  }
}
