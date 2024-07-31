import { create } from 'zustand';
import {Ticket} from "@/types/ticket.ts";


interface Category {
    id: string;
    name: string;
}

interface BoardStore {
    categories: Category[];
    tickets: Ticket[];
    setTickets:(tickets: Ticket[])=>void;
    ticketModalOpen: boolean;
    setTicketModal: (open: boolean) => void;
    categoryModalOpen: boolean;
    setCategoryModalOpen: (categoryModalOpen: boolean) => void;
    updateCategories: (categories: Category[]) => void;
    addTicket: (ticket: Ticket) => void;
}

const useBoardStore = create<BoardStore>((set) => ({
    categories: [],
    tickets: [],
    ticketModalOpen: false,
    setTicketModal: (open) => set({ ticketModalOpen: open }),
    categoryModalOpen: false,
    setCategoryModalOpen: (open) => set({ categoryModalOpen: open }),
    updateCategories: (categories) =>
        set({ categories: categories }),
    setTickets: (tickets) =>
        set({ tickets: tickets }),
    addTicket: (ticket) =>
        set((state) => ({
            tickets: [...state.tickets, ticket],
            categories: state.categories.map((category) =>
                category.id === ticket.category
                    ? { ...category }
                    : category
            ),
        })),
}));
export default useBoardStore;
