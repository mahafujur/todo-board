import React from "react";
import useBoardStore from "@/store/useBoardStore.ts";
import {checkExpiryDate} from "@/utils/helper.ts";
import clsx from "clsx";
import {Ticket} from "@/types/ticket.ts";

interface TicketProps {
    ticket: Ticket;
}


const TicketCard: React.FC<TicketProps> = ({ticket}) => {
    const {moveTicket} = useBoardStore();

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('ticketId', ticket.id);
    };

    const handleDrop = (e: React.DragEvent, categoryId: string) => {
        const ticketId = e.dataTransfer.getData('ticketId');
        moveTicket(ticketId, categoryId);
    };
    const {isExpired, isToday} = checkExpiryDate(ticket.expiryDate)
    const errorClass = `${isToday ? 'bg-primary100' : isExpired ? 'bg-error100' : ''}`

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className={clsx(errorClass, 'p-4 bg-white rounded shadow mb-2 cursor-pointer')}
        >
            <h3 className="text-lg font-semibold">{ticket.title}</h3>
            <p>{ticket.description}</p>
            <small>Expiry: {new Date(ticket.expiryDate).toLocaleDateString()}</small>
        </div>
    );
};


export default TicketCard;
