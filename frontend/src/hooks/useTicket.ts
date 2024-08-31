import {sendGetRequest, sendPostRequest, sendPutRequest} from '@/lib/ApiHandler';
import {Api_Ticket_Url} from '@/utils/apiAccessUrls';
import {Ticket} from "@/types/ticket.ts";

export const useTicket = () => {
    const createATicket = (body: Ticket) => {
        return sendPostRequest(Api_Ticket_Url+'', {...body});

    };
    const getAllTickets = (workspaceId: string) => {
        return sendGetRequest(Api_Ticket_Url + `/${workspaceId}`);

    };
    const updateTicketStatus = (ticket: Ticket, categoryId: string,workspaceId: string) => {
        const ticketId = ticket?.id;
        const body = {...ticket, categoryId: categoryId,workspaceId: workspaceId}
        return sendPutRequest(Api_Ticket_Url + `/${ticketId}`, body);
    };


    const getTicketDetails = (id: string) => {
        return sendGetRequest(Api_Ticket_Url + `/${id}`,);

    };

    const updateTicketApi = (ticket: Ticket) => {
        const body = {...ticket}
        return sendPutRequest(Api_Ticket_Url + `/${ticket.id}`, body)
    }


    return {createATicket, getAllTickets, updateTicketStatus, getTicketDetails, updateTicketApi};
};
