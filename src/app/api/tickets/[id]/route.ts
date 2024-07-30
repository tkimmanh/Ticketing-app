import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import { ticketSchema } from "@/validation-schemas/tickets.schema";

interface Props {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const { id } = params;
    const body = await request.json();
    const validation = ticketSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), {
        status: 400,
      });
    }
    if (!id) {
      return NextResponse.json("Ticket ID is required", {
        status: 400,
      });
    }
    const { title, description, status, priority } = body;
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!ticket) {
      return NextResponse.json("Ticket not found", {
        status: 404,
      });
    }
    await prisma.ticket.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        description,
        status,
        priority,
      },
    });

    return NextResponse.json(
      {
        message: "Ticket updated successfully",
        ticket,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json("Something went wrong", {
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    await prisma.ticket.delete({ where: { id: parseInt(params.id) } });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Something went wrong", {
      status: 500,
    });
  }
}
