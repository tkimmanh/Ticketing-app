import React from "react";
import prisma from "../../../../prisma/db";

import TicketDetail from "./tickets-detail";
import { Ticket } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
}
const TicketDetailPage = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return (
    <div>
      <TicketDetail ticket={ticket as Ticket}></TicketDetail>
    </div>
  );
};

export default TicketDetailPage;
