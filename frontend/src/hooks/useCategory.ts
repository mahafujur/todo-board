import {sendGetRequest, sendPostRequest, sendPutRequest} from '@/lib/ApiHandler';
import {Api_Categories_Url} from '@/utils/apiAccessUrls';

export const useCategory = () => {
    const createACategory = (name: string) => {
        return sendPostRequest(Api_Categories_Url, {
            name
        });

    };
    const getAllCategories = (workspaceId: string) => {
        return sendGetRequest(Api_Categories_Url + `/${workspaceId}`);

    };
    const updateCategoryName = (id: string, value: string) => {
        return sendPutRequest(Api_Categories_Url + `/${id}`, {name: value});
    }

    return {createACategory, getAllCategories, updateCategoryName};
};
