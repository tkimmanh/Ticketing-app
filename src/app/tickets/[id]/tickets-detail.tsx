"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket } from "@prisma/client";
import TicketStatus from "@/components/ticktets-status";
import TicketsPriorityDot from "@/components/tickets-priority-dot";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import ButtonDelete from "./delete-button";

interface Props {
  ticket: Ticket;
}

const TicketDetail = ({ ticket }: Props) => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <TicketStatus status={ticket.status} />

            <TicketsPriorityDot priority={ticket.priority} />
          </div>
          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>
            {ticket.createdAt.toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose">
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
            {ticket.description}
          </ReactMarkdown>
        </CardContent>
        <CardFooter>
          Update : {ticket.updatedAt.toLocaleDateString()}
        </CardFooter>
      </Card>
      <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
        <Link
          href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({
            variant: "default",
          })}`}
        >
          Edit Ticket
        </Link>
        <ButtonDelete ticketId={ticket.id} />
      </div>
    </div>
  );
};

export default TicketDetail;
