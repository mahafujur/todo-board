import {sendGetRequest, sendPostRequest, sendPutRequest} from '@/lib/ApiHandler';
import {Api_Ticket_Url} from '@/utils/apiAccessUrls';
import {Ticket} from "@/types/ticket.ts";

export const useTicket = () => {
    const createATicket = (body:Ticket) => {
        return sendPostRequest(Api_Ticket_Url, {...body});

    };
    const getAllTickets = () => {
        return sendGetRequest(Api_Ticket_Url);

    };
    const updateTicketStatus = (ticket:Ticket, categoryId:string) => {
        const ticketId = ticket?.id;
        const body = {...ticket, categoryId:categoryId}
        return  sendPutRequest(Api_Ticket_Url + `/${ticketId}`, body);
    };

    return {createATicket, getAllTickets, updateTicketStatus};
};
