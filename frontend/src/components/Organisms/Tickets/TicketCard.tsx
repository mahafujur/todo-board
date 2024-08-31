import React from "react";
import useBoardStore from "@/store/useBoardStore.ts";
import {checkExpiryDate} from "@/utils/helper.ts";
import clsx from "clsx";
import {Ticket} from "@/types/ticket.ts";
import Icon from "@/Icons";

interface TicketProps {
    ticket: Ticket;
}


const TicketCard: React.FC<TicketProps> = ({ticket}) => {
    const {moveTicket} = useBoardStore();

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('ticketId', ticket?.id as string);
    };

    const handleDrop = (e: React.DragEvent, categoryId: string) => {
        const ticketId = e.dataTransfer.getData('ticketId');
        moveTicket(ticketId, categoryId);
    };
    const {isExpired, isToday} = checkExpiryDate(ticket?.expiryDate)
    const errorClass = `${isToday ? 'bg-primary100' : isExpired ? 'bg-error100' : ''}`

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className={clsx(errorClass, 'group p-4 flex justify-between items-center gap-x-1 bg-white rounded-md shadow mb-2 cursor-pointer')}
        >
            <h3 className="text-lg font-semibold">{ticket.title}</h3>

            <Icon name={'editIcon'} className={' w-[18px] h-[18px]  invisible group-hover:visible'}/>

            {/*<p>{ticket.description}</p>*/}
            {/*{ticket?.expiryDate?.length ?*/}
            {/*    <small>Expiry: new Date(ticket?.expiryDate as string).toLocaleDateString() </small> : ''}*/}
        </div>
    );
};


export default TicketCard;
