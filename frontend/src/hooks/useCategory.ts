import {sendGetRequest, sendPostRequest} from '@/lib/ApiHandler';
import {Api_Categories_Url} from '@/utils/apiAccessUrls';

export const useCategory = () => {
    const createACategory = (name:string) => {
        return sendPostRequest(Api_Categories_Url, {
            name
        });

    };
    const getAllCategories = (workspaceId:string) => {
        return sendGetRequest(Api_Categories_Url+`/${workspaceId}`);

    };

    return {createACategory, getAllCategories};
};
