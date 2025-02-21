
export function setCookies(res: any) {

  res.cookies.set("session_data", JSON.stringify({ theme: "dark" }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
}

export function getCookies(req: any){
  return JSON.parse(req.cookies.session_data || "{}")
}
