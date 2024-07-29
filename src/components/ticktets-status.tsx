import React from "react";
import { Badge } from "./ui/badge";
import { Status } from "@prisma/client";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  {
    lable: string;
    color: "bg-red-400" | "bg-green-400" | "bg-yellow-400" | "bg-blue-400";
  }
> = {
  OPEN: { lable: "Open", color: "bg-blue-400" },
  STARTED: { lable: "In Progress", color: "bg-yellow-400" },
  CLOSED: { lable: "Close", color: "bg-green-400" },
};

const TicketStatus = ({ status }: Props) => {
  return (
    <Badge className={`${statusMap[status].color} text-background `}>
      {statusMap[status].lable}
    </Badge>
  );
};

export default TicketStatus;
