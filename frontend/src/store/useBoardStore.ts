import { create } from 'zustand';
import {Ticket} from "@/types/ticket.ts";


interface Category {
    id: string;
    name: string;
}

interface BoardStore {
    categories: Category[];
    updateCategory: (categories: Category) => void;
    tickets: Ticket[];
    setTickets:(tickets: Ticket[])=>void;
    ticketModalOpen: boolean;
    setTicketModal: (open: boolean) => void;
    categoryModalOpen: boolean;
    setCategoryModalOpen: (categoryModalOpen: boolean) => void;
    setCategories: (categories: Category[]) => void;
    addTicket: (ticket: Ticket) => void;
}

const useBoardStore = create<BoardStore>((set) => ({
    categories: [],
    tickets: [],
    ticketModalOpen: false,
    setTicketModal: (open) => set({ ticketModalOpen: open }),
    categoryModalOpen: false,
    setCategoryModalOpen: (open) => set({ categoryModalOpen: open }),
    setCategories: (categories) =>
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
    updateCategory: (newCategory) =>
        set((state) => {
            // Check if the category already exists
            const categoryExists = state.categories.some(
                (category) => category.id === newCategory.id
            );
            // If it doesn't exist, add the new category
            if (!categoryExists) {
                return {
                    categories: [...state.categories, newCategory],
                };
            }
            // If it does exist, return the state unchanged
            return state;
        }),

}));
export default useBoardStore;
