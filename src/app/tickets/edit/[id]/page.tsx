import dynamic from "next/dynamic";
import React from "react";
import prisma from "../../../../../prisma/db";

const TicketForm = dynamic(() => import("@/components/ticket-form"), {
  ssr: false,
});

interface TicketEditProps {
  params: {
    id: string;
  };
}
const TicketEdit = async ({ params }: TicketEditProps) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  return (
    <div>
      <TicketForm type="edit" ticket={ticket}></TicketForm>
    </div>
  );
};

export default TicketEdit;
