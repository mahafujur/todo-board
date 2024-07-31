import {sendGetRequest, sendPostRequest} from '@/lib/ApiHandler';
import {Api_Categories_Url, Api_Ticket_Url} from '@/utils/apiAccessUrls';

export const useTicket = () => {
    const createATicket=(body) => {
        return sendPostRequest(Api_Ticket_Url, body);

    };
    const getAllTickets= () => {
        return sendGetRequest(Api_Ticket_Url);

    };

    return {createATicket, getAllTickets};
};
