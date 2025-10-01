import { Request, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getUserFromRequest } from "@/lib/session";

export async function GET(req: Request) {
  try {
    const user = await getUserFromRequest(req);

    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getUserFromRequest(req);
    const userId = user.id;

    const body = await req.json();
    const { title, description, status } = body;

    if (!title) {
      return NextResponse.json(
        { message: "Títulos são obrigatórios." },
        { status: 400 }
      );
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
