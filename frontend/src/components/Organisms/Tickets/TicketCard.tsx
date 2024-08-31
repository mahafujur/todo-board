import React from "react";
import useBoardStore from "@/store/useBoardStore.ts";
import {checkExpiryDate} from "@/utils/helper.ts";
import clsx from "clsx";
import {Ticket} from "@/types/ticket.ts";
import Icon from "@/Icons";

interface TicketProps {
    ticket: Ticket;
    handleTicketEdit: (id: string) => void;
}


const TicketCard: React.FC<TicketProps> = ({ticket, handleTicketEdit}) => {
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

    const handleClick = (e: any) => {
        e.preventDefault()
        handleTicketEdit(ticket?.id as string)
    }

    return (
        <div
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            className={clsx(errorClass, 'group p-4  bg-white rounded-md shadow mb-2 cursor-pointer')}
        >
            <div className={'flex justify-between items-center gap-x-1'}>
                <h3 className="text-lg font-semibold">{ticket.title}</h3>
                <Icon name={'editIcon'} className={' w-[18px] h-[18px]  invisible group-hover:visible'}/>
            </div>
            <Icon name={'shortingIcon'} className={'mt-1 w-[18px] h-[18px] text-gray400  '}/>
            {/*<p>{ticket.description}</p>*/}
            {/*{ticket?.expiryDate?.length ?*/}
            {/*    <small>Expiry: new Date(ticket?.expiryDate as string).toLocaleDateString() </small> : ''}*/}
        </div>
    );
};


export default TicketCard;
