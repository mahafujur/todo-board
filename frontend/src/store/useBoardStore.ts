import {create} from 'zustand';
import {Category, Ticket} from "@/types/ticket.ts";
import {IWorkspace} from "@/types/workspace.ts";

interface BoardStore {
    categories: Category[];
    updateCategory: (categories: Category) => void;
    tickets: Ticket[];
    setTickets: (tickets: Ticket[]) => void;
    ticketModalOpen: boolean;
    setTicketModal: (open: boolean) => void;
    categoryModalOpen: boolean;
    setCategoryModalOpen: (categoryModalOpen: boolean) => void;
    setCategories: (categories: Category[]) => void;
    addTicket: (ticket: Ticket) => void;
    moveTicket: (ticketId: string, targetCategoryId: string) => void;
    workSpaceModalOpen: boolean;
    setWorkSpaceModalOpen: (workSpaceModalOpen: boolean) => void;
    workspaces: IWorkspace[],
    setWorkspaces: (workspaces: IWorkspace []) => void;
    updateTicket:(ticketId:string,ticket:Ticket)=>void;
    updateWorkspace: (newWorkspace: IWorkspace) => void;
}

const useBoardStore = create<BoardStore>((set) => ({
    categories: [],
    tickets: [],
    ticketModalOpen: false,
    setTicketModal: (open) => set({ticketModalOpen: open}),
    categoryModalOpen: false,
    setCategoryModalOpen: (open) => set({categoryModalOpen: open}),
    setCategories: (categories) =>
        set({categories: categories}),
    setTickets: (tickets) =>
        set({tickets: tickets}),
    addTicket: (ticket) =>
        set((state) => ({
            tickets: [...state.tickets, ticket],
            categories: state.categories.map((category) =>
                category.id === ticket.category
                    ? {...category}
                    : category
            ),
        })),
    updateCategory: (newCategory) =>
        set((state) => {
            // Check if the category already exists by finding its index
            const categoryIndex = state.categories.findIndex(
                (category) => category.id === newCategory.id
            );

            // If the category exists, replace it with the new category
            if (categoryIndex !== -1) {
                // Create a copy of the existing categories array
                const updatedCategories = [...state.categories];

                // Replace the existing category with the new category
                updatedCategories[categoryIndex] = newCategory;

                return {
                    categories: updatedCategories,
                };
            }

            // If the category does not exist, add the new category
            return {
                categories: [...state.categories, newCategory],
            };
        }),
    moveTicket: (ticketId, targetCategoryId) => set((state) => ({
        tickets: state.tickets.map((ticket) =>
            ticket.id === ticketId ? {...ticket, category: targetCategoryId} : ticket
        ),
    })),
    updateTicket: (ticketId, updatedTicket) =>
        set((state) => ({
            tickets: state.tickets.map((ticket) =>
                ticket.id === ticketId ? { ...ticket, ...updatedTicket } : ticket
            ),
        })),
    workSpaceModalOpen: false,
    setWorkSpaceModalOpen: (open) => set({workSpaceModalOpen: open}),
    workspaces: [],
    setWorkspaces: (workspaces) =>
        set({workspaces: workspaces}),
    updateWorkspace: (newWorkspace) => // Implementation of the updateWorkspace method
        set((state) => {
            const workspaceIndex = state.workspaces.findIndex(
                (workspace) => workspace.id === newWorkspace.id
            );

            if (workspaceIndex !== -1) {
                const updatedWorkspaces = [...state.workspaces];
                updatedWorkspaces[workspaceIndex] = newWorkspace;

                return {
                    workspaces: updatedWorkspaces,
                };
            }

            // If the workspace does not exist, add the new workspace
            return {
                workspaces: [...state.workspaces, newWorkspace],
            };
        }),

}));
export default useBoardStore;
