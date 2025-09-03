import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout realizado com sucesso." },
      { status: 200 }
    );

    response.cookies.set("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Erro no servidor ao fazer logout." },
      { status: 500 }
    );
  }
}
