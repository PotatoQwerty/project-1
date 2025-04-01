// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// export async function POST(request) {
//   const cookie = await cookies();
//   cookie.set("token", "", { maxAge: 0, path: "/" });
//   return NextResponse.json({ message: "logout successfull" }, { status: 200 });
// }
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("token", "", { maxAge: 0, path: "/" }); // Remove cookie
  return res;
}
