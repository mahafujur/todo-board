import { create } from 'zustand';

interface Ticket {
    id: string;
    title: string;
    description: string;
    expiryDate: string;
    categoryId: string;
}

interface Category {
    id: string;
    name: string;
}

interface BoardStore {
    categories: Category[];
    tickets: Ticket[];
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    updateCategories: (categories: Category[]) => void;
    addTicket: (ticket: Ticket) => void;
}

const useBoardStore = create<BoardStore>((set) => ({
    categories: [],
    tickets: [],
    modalOpen: false,
    setModalOpen: (open) => set({ modalOpen: open }),
    updateCategories: (categories) =>
        set({ categories: categories }),
    addTicket: (ticket) =>
        set((state) => ({
            tickets: [...state.tickets, ticket],
            categories: state.categories.map((category) =>
                category.id === ticket.categoryId
                    ? { ...category }
                    : category
            ),
        })),
}));
export default useBoardStore;
