import dynamic from "next/dynamic";

import React from "react";

const TicketForm = dynamic(() => import("@/components/ticket-form"), {
  ssr: false,
});

const TicketAddNew = () => {
  return (
    <div>
      <TicketForm type="create"></TicketForm>
    </div>
  );
};

export default TicketAddNew;
