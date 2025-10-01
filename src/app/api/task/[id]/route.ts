import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getUserFromRequest } from "@/lib/session";
import { RouteContext } from "@/types";

export async function PUT(req: Request, context: RouteContext) {
  try {
    const user = await getUserFromRequest(req);
    const userId = user.id;

    const { title, description, status } = await req.json();
    const { id } = context.params;

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

export async function DELETE(req: Request, context: RouteContext) {
  try {
    const user = await getUserFromRequest(req);
    const userId = user.id;

    const { id } = context.params;

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
