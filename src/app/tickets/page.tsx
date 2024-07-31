import React from "react";
import DataTable from "./data-table";
import prisma from "../../../prisma/db";
import Paggination from "@/components/paggination";
interface SearchParams {
  page: string;
}

const TicketsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const pageSize = 2;
  const page = parseInt(searchParams.page) || 1;

  const ticketCount = await prisma.ticket.count();

  const tickets = await prisma.ticket.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div>
      <DataTable tickets={tickets}></DataTable>
      <Paggination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      ></Paggination>
    </div>
  );
};

export default TicketsPage;
