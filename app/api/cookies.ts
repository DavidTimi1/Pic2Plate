"use server";

import { cookies } from "next/headers";

export async function setCookies(data: any) {

  const cookieJar = await cookies();
  cookieJar.set("session_data", JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
}

export async function getCookies(){
  const cookieJar = await cookies();
  return JSON.parse( cookieJar.get("session_data") as any );
}
