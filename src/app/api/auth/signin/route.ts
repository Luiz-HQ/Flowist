import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, ...(user.name && { name: user.name }) },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "1h" }
    );

    const responsePayload = {
      message: "Login realizado com sucesso!",
      token,
    };

    const response = NextResponse.json(responsePayload);

    response.cookies.set("authToken", token, {
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ message: "Erro no servidor." }, { status: 500 });
  }
}
