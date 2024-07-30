import {sendPostRequest} from '@/lib/ApiHandler';
import {Api_Categories_Url, AuthLoginUrl} from '@/utils/apiAccessUrls';

export const useCategory = () => {
    const createACategory = (name) => {
        return sendPostRequest(Api_Categories_Url, {
          name
        });

    };

    return {createACategory};
};
