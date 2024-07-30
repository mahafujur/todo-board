import {sendGetRequest, sendPostRequest} from '@/lib/ApiHandler';
import {Api_Categories_Url} from '@/utils/apiAccessUrls';

export const useCategory = () => {
    const createACategory = (name) => {
        return sendPostRequest(Api_Categories_Url, {
            name
        });

    };
    const getAllCategories = () => {
        return sendGetRequest(Api_Categories_Url);

    };

    return {createACategory, getAllCategories};
};
