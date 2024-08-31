import {sendGetRequest, sendPostRequest, sendPutRequest} from '@/lib/ApiHandler';
import {Api_Categories_Url, Api_Ticket_Url} from '@/utils/apiAccessUrls';
import {Ticket} from "@/types/ticket.ts";

export const useTicket = () => {
    const createATicket = (body:Ticket) => {
        return sendPostRequest(Api_Ticket_Url, {...body});

    };
    const getAllTickets = (workspaceId:string) => {
        return sendGetRequest(Api_Ticket_Url+`/${workspaceId}`);

    };
    const updateTicketStatus = (ticket:Ticket, categoryId:string) => {
        const ticketId = ticket?.id;
        const body = {...ticket, categoryId:categoryId}
        return  sendPutRequest(Api_Ticket_Url + `/${ticketId}`, body);
    };

    const updateCategoryName = (id:string,value:string) => {
        return  sendPutRequest(Api_Categories_Url + `/${id}`, {name:value});
    }

    const getTicketDetails = (id:string) => {
        return sendGetRequest(Api_Ticket_Url + `/${id}`,);

    };

    const updateTicket= (ticket:Ticket) => {
        const body = {...ticket}
        return sendPutRequest(Api_Ticket_Url + `/${ticket.id}`, body)
    }

    const getWorkSpaceMembers = (workspaceId:string) => {
        return sendGetRequest(Api_Ticket_Url + `/${workspaceId}`,);
    }

    return {createATicket, getAllTickets, updateTicketStatus,updateCategoryName,getTicketDetails,updateTicket,getWorkSpaceMembers};
};
