import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const credentials = await request.json();

    const response = await axios.post(
      "https://fakestoreapi.com/auth/login",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is successful
    if (response.status !== 200) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 400 }
      );
    }

    const token = response.data.token;

    // set the token as an HTTP-only cookie because it is sensitive information
    // and should not be accessible via JavaScript on the client side
    const res = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Error during login:", error.message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
