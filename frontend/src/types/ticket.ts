export interface Ticket {
    id?: string;
    title: string;
    description?: string;
    expiryDate?: string;
    category?: string;
    categoryId?: string;
}

export interface Category {
    id: string;
    name: string;
}

