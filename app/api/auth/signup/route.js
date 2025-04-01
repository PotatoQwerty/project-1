import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // parse the request body to get user data
    const { username, email, password } = await request.json();

    // Make the POST request to the external API
    const response = await axios.post("https://fakestoreapi.com/users", {
      username,
      email,
      password,
    });

    return NextResponse.json(
      { message: "Signup successful", data: response.data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during signup:", error.message);

    if (error.response) {
      return NextResponse.json(
        { error: error.response.data || "External API error" },
        { status: error.response.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong during signup" },
      { status: 500 }
    );
  }
}
