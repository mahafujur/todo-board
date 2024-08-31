import React, { useMemo, useState } from "react";
import { Category } from "@/types/ticket.ts";
import useBoardStore from "@/store/useBoardStore.ts";
import { useTicket } from "@/hooks/useTicket.ts";
import TicketCard from "@/components/Organisms/Tickets/TicketCard.tsx";
import { EditableInput } from "@/components/Atom/Input";
import CreateTicketCard from "@/components/Organisms/Tickets/CreateTicektCard.tsx";

const TicketListRow: React.FC<{ category: Category }> = ({ category }) => {
    const { tickets, moveTicket, updateCategory, ticketModalOpen, setTicketModal } = useBoardStore();
    const { updateTicketStatus, updateCategoryName } = useTicket();
    const [isCreatingTicket, setIsCreatingTicket] = useState(false); // State for showing the input field

    const handleCreateATicket = () => {
        setIsCreatingTicket(true); // Show input field when button is clicked
    };

    const categoryTickets = useMemo(() => {
        return tickets.filter((ticket) => ticket.category === category.id);
    }, [tickets, category]);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const ticketId = e.dataTransfer.getData("ticketId");
        moveTicket(ticketId, category.id);
        const ticket = tickets.find((item) => item.id === ticketId);
        if (ticket)
            updateTicketStatus(ticket, category.id)
                .then((res) => {
                    console.log("success", res);
                })
                .catch(() => {
                    window.location.reload();
                });
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const updateFiledName = (value: string) => {
        updateCategoryName(category.id, value)
            .then((res) => {
                updateCategory({
                    name: value,
                    id: category.id,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="px-4 pt-4 pb-2 bg-gray100 rounded shadow mb-4 min-h-[80vh] md:min-w-[272px] flex flex-col justify-between"
        >
            {/* Header: Fixed at the top */}
            <div className="pb-2 w-full flex-shrink-0">
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

            {/* Middle Content: Scrollable */}
            <div className="flex-grow overflow-y-auto  max-h-[67vh]">
                {categoryTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}

                {/* Conditionally render the CreateTicketCard component */}
                {isCreatingTicket && (
                    <CreateTicketCard
                        id={category.id}
                        onCancel={() => setIsCreatingTicket(false)}
                    />
                )}
            </div>

            {/* Footer: Fixed at the bottom */}
            <div className="flex-shrink-0 mt-2">
                {!isCreatingTicket && (
                    <button
                        onClick={handleCreateATicket}
                        className="bottom-0 justify-center rounded-md flex hover:bg-white py-1 w-full max-w-[240px]"
                    >
                        + Add a card
                    </button>
                )}
            </div>
        </div>
    );
};

export default TicketListRow;
