import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const AUTH_COOKIE_NAME = "authToken";
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function middleware(request: NextRequest) {
  if (!JWT_SECRET) {
    console.error(
      "JWT_SECRET não está definido no .env. O middleware não pode verificar tokens."
    );
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  let isTokenValid = false;

  if (token) {
    try {
      const secretKey = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secretKey);
      isTokenValid = true;
    } catch (err) {
      console.error("Falha na verificação do token no middleware:", err);
      isTokenValid = false;
    }
  }

  if (!isTokenValid && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(loginUrl);

    return response;
  }

  if (isTokenValid && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
