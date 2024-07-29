"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { ticketSchema } from "@/validation-schemas/tickets.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Ticket } from "@prisma/client";

type TicketFormData = z.infer<typeof ticketSchema>;

type TicketFormProps = {
  ticket?: Ticket | null;
  type: "edit" | "create";
};

const TicketForm = ({ type, ticket }: TicketFormProps) => {
  const [isSubmitting, setIsubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      ...ticket,
    },
  });
  const onSubmit = async (value: TicketFormData) => {
    try {
      setIsubmitting(true);
      if (type === "create") {
        await fetch("/api/tickets", {
          method: "POST",
          body: JSON.stringify(value),
        });
      }
      if (type === "edit") {
        await fetch(`/api/tickets/${ticket?.id}`, {
          method: "PUT",
          body: JSON.stringify(value),
        });
      }
      setIsubmitting(false);
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsubmitting(false);
    }
  };
  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ticket Title" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => <SimpleMDE {...field}></SimpleMDE>}
          />
          <div className="flex w-full space-x-4"></div>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status..."></SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="OPEN">Open</SelectItem>
                    <SelectItem value="STARTED">Started</SelectItem>
                    <SelectItem value="CLOSED">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority..."></SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          ></FormField>
          <Button disabled={isSubmitting} type="submit">
            {type === "create" ? "Create Ticket" : "Update Ticket"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
