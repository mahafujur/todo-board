import {sendPostRequest} from '@/lib/ApiHandler';
import {AuthLoginUrl} from '@/utils/apiAccessUrls';

export const useLoginApiHandler = () => {
    const signInApiCall = (email: string, secret: string) => {
        return sendPostRequest(AuthLoginUrl, {
            email,
            password: secret,
        });

    };

    return {signInApiCall};
};
