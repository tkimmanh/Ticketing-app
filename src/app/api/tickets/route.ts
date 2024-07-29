import { NextRequest, NextResponse } from "next/server";
import { ticketSchema } from "@/validation-schemas/tickets.schema";
import prisma from "../../../../prisma/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = ticketSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), {
        status: 400,
      });
    }
    const { title, description, status, priority } = body;
    const newTicket = await prisma.ticket.create({
      data: {
        title,
        description,
        status,
        priority,
      },
    });

    return NextResponse.json(newTicket, {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Something went wrong", {
      status: 500,
    });
  }
}
