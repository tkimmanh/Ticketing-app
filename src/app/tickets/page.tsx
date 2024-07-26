import Prisma from "@/../prisma/db";
import React from "react";

const TicketsPage = async () => {
  const tickets = await Prisma.ticket.findMany();
  console.log(tickets);
  return <div>TicketsPage</div>;
};

export default TicketsPage;
