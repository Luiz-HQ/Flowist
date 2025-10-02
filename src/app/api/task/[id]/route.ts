import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getUserFromRequest } from "@/lib/session";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromRequest(req);
    const userId = user.id;

    const { title, description, status } = await req.json();
    const { id } = await params;

    const updatedTask = await prisma.task.update({
      where: { id, userId },
      data: {
        title,
        description,
        status,
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromRequest(req);
    const userId = user.id;

    const { id } = await params;

    const deletedTask = await prisma.task.deleteMany({
      where: { id, userId },
    });

    if (deletedTask.count === 0) {
      return NextResponse.json(
        {
          message:
            "Tarefa não encontrada ou você não tem permissão para excluí-la.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tarefa excluída com sucesso!" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
