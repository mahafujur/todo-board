import {sendGetRequest, sendPostRequest, sendPutRequest} from '@/lib/ApiHandler';
import {Api_Ticket_Url} from '@/utils/apiAccessUrls';

export const useTicket = () => {
    const createATicket = (body) => {
        return sendPostRequest(Api_Ticket_Url, body);

    };
    const getAllTickets = () => {
        return sendGetRequest(Api_Ticket_Url);

    };
    const updateTicketStatus = (ticket, categoryId) => {
        const ticketId = ticket?.id;
        const body = {...ticket, categoryId:categoryId}
        return  sendPutRequest(Api_Ticket_Url + `/${ticketId}`, body);
    };

    return {createATicket, getAllTickets, updateTicketStatus};
};
