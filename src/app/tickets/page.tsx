import React from "react";
import DataTable from "./data-table";
import prisma from "../../../prisma/db";

const TicketsPage = async () => {
  const tickets = await prisma.ticket.findMany();
  return (
    <div>
      <DataTable tickets={tickets}></DataTable>
    </div>
  );
};

export default TicketsPage;
