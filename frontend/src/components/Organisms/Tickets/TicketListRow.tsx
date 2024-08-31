import React, {useMemo} from "react";
import {Category} from "@/types/ticket.ts";
import useBoardStore from "@/store/useBoardStore.ts";
import {useTicket} from "@/hooks/useTicket.ts";
import TicketCard from "@/components/Organisms/Tickets/TicketCard.tsx";
import {EditableInput} from "@/components/Atom/Input";


const TicketListRow: React.FC<{ category: Category }> = ({category}) => {
    const {tickets, moveTicket, updateCategory} = useBoardStore();
    const {updateTicketStatus, updateCategoryName} = useTicket()
    const categoryTickets = useMemo(() => {
        return tickets.filter(ticket => ticket.category === category.id);
    }, [tickets, category])

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const ticketId = e.dataTransfer.getData('ticketId');
        moveTicket(ticketId, category.id);
        const ticket = tickets.find((item) => item.id === ticketId)
        if (ticket) updateTicketStatus(ticket, category.id).then((res) => {
            console.log('success', res)
        }).catch(() => {
            window.location.reload()
        })
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const updateFiledName = (value: string) => {
        updateCategoryName(category.id, value).then((res) => {
            updateCategory({
                name: value,
                id: category.id
            })
        }).catch((err) => {
            console.error(err)
        })

    }

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="p-4 bg-gray100 rounded shadow mb-4 min-h-[80vh] md:min-w-[272px]"
        >
            <div className=" pb-2 w-full">
                <EditableInput
                    initialValue={category.name}
                    onSave={updateFiledName}
                    placeholder="Enter ticket name..."
                    inputStyle="border-blue-500 focus:border-blue-700"
                    textStyle="text-gray-800 font-bold max-w-[272px] word-breaks"
                    background="bg-gray100"
                    focusStyle="ring-2 ring-blue-300 w-full max-w-[272px]"
                />
            </div>


            {categoryTickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket}/>
            ))}
        </div>
    );
};

export default TicketListRow;
