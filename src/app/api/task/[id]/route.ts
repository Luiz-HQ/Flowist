import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { verifyToken } from "../../middleware/verifyToken";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decoded: any = verifyToken(req);
    const userId = decoded.id;

    const { title, description, done } = await req.json();
    const { id } = params;

    const updatedTask = await prisma.task.updateMany({
      where: { id, userId },
      data: {
        title,
        description,
        done,
      },
    });

    if (updatedTask.count === 0) {
      return NextResponse.json(
        {
          message:
            "Tarefa não encontrada ou você não tem permissão para atualizá-la.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Dados atualizados com sucesso!" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decoded: any = verifyToken(req);
    const userId = decoded.id;

    const { id } = params;

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
