"use server";

import { UUID } from "crypto";
import { cookies } from "next/headers";


export async function getCookie(key: string) {
  const cookieJar = await cookies();
  const cookie  = cookieJar.get(key);

  return cookie? JSON.parse(cookie.value) : null
}


export async function setCookies(data: {userID: UUID}) {

  const cookieJar = await cookies();
  cookieJar.set("session_data", JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
}

export async function getSessionCookies(){
  const sessionData  = await getCookie("session_data");
  return sessionData || {};
}

export async function saveAsCookie(key: string, data: Record<string, unknown>) {
  const cookieJar = await cookies();
  cookieJar.set(key, JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
}


export async function deleteCookie(key: string) {
  const cookieJar = await cookies();
  cookieJar.delete(key);
}