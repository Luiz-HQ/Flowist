import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const AUTH_COOKIE_NAME = "authToken";
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function GET(request: NextRequest) {
  if (!JWT_SECRET) {
    return NextResponse.json(
      { message: "Erro de configuração do servidor." },
      { status: 500 }
    );
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Não autorizado: Nenhum token encontrado." },
      { status: 401 }
    );
  }

  try {
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);

    return NextResponse.json(
      {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Não autorizado: Token inválido." },
      { status: 401 }
    );
  }
}
