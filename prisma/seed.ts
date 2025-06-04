import { PrismaClient, Prisma } from "./lib/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Luiz",
    email: "Luiz@prisma.io",
    password: "password123",
  },
  {
    name: "Henry",
    email: "henry@email.io",
    password: "123",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
