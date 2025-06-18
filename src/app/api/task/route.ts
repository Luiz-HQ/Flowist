import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { verifyToken } from "../middleware/verifyToken";

export async function GET(req: NextRequest) {
  try {
    const decoded: any = verifyToken(req);
    const userId = decoded.id;

    const tasks = await prisma.user.findMany({
      where: { id: userId },
      select: {
        task: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const decoded: any = verifyToken(req);
    const userId = decoded.id;

    const body = await req.json();
    const { title, description } = body;

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
        userId,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
