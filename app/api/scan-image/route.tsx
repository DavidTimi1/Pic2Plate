import { NextResponse } from "next/server";
import {findIngredients} from "./scan.js";


export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ message: "No file detected" }, {status: 404});
    }

    const deduced_info = await findIngredients(image);

    const scanned = deduced_info.response.text();
    return NextResponse.json(scanned, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to identify meal in image" }, { status: 500 });
  }
}

