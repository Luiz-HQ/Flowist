import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export interface UserPayload {
  id: string;
  email: string;
  name?: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Esta é a nossa função helper. Ela será chamada no início de cada rota de API protegida.
 * Seu único trabalho é verificar se a requisição vem de um usuário autenticado e,
 * em caso afirmativo, retornar os dados desse usuário.
 *
 * @param request - O objeto da requisição (NextRequest) que chega na sua API route.
 * @returns O payload do usuário (UserPayload) se o token for válido.
 * @throws Lança um erro se o token não for fornecido, for mal formatado ou inválido.
 *         Isso permite que usemos um bloco try...catch na nossa API route para lidar com falhas.
 */

export async function getUserFromRequest(
  request: NextRequest
): Promise<UserPayload> {
  if (!JWT_SECRET) {
    throw new Error(
      "Chave secreta JWT (JWT_SECRET) não está configurada no ambiente do servidor."
    );
  }

  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    throw new Error("Não autorizado: Token não fornecido.");
  }

  try {
    // Verifica a validade do token.
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    // Se a verificação for bem-sucedida, retorna o payload.
    // O 'as UserPayload' garante ao TypeScript que o objeto retornado tem o formato que esperamos.
    return payload as unknown as UserPayload;
  } catch (error) {
    // Se o 'try' falhar, significa que o token é inválido.

    console.error("Falha na verificação do token na API:", error);
    throw new Error("Não autorizado: Token inválido ou expirado.");
  }
}
