import React, {useMemo} from 'react';
import useBoardStore from '@/store/useBoardStore';
import {Category, Ticket} from "@/types/ticket.ts";
import {Typography} from "@/components/Atom";
import clsx from "clsx";
import {checkExpiryDate} from "@/utils/helper.ts";
import {useTicket} from "@/hooks/useTicket.ts";

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

    console.log(errorClass, 'error', isToday, isExpired)
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

const CategoryRow: React.FC<{ category: Category }> = ({category}) => {
    const {tickets, moveTicket} = useBoardStore();
    const {updateTicketStatus} = useTicket()
    const categoryTickets = useMemo(() => {
        return tickets.filter(ticket => ticket.category === category.id);
    }, [tickets, category])

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const ticketId = e.dataTransfer.getData('ticketId');
        moveTicket(ticketId, category.id);
        const ticket = tickets.find((item) => item.id === ticketId)
        if (ticket) updateTicketStatus(ticket, category.id).then((res)=>{
            console.log('success',res)
        }).catch(()=>{
            window.location.reload()
        })
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };


    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="p-4 bg-gray-100 rounded shadow mb-4 min-h-[80vh] md:min-w-[200px]"
        >
            <Typography variant={{
                web: 'Title-20-Semibold',
                mobile: 'Body-16-Semibold'
            }} tag='h2' className="mb-2">{category.name} </Typography>
            {categoryTickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket}/>
            ))}
        </div>
    );
};
const Board: React.FC = () => {
    const {categories, addCategory} = useBoardStore();

    return (
        <div className="flex space-x-4 overflow-x-scroll p-4">
            {categories.map((category) => (
                <CategoryRow key={category.id} category={category}/>
            ))}
        </div>
    );
};

export default Board;
