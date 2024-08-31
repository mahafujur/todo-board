import {sendPostRequest} from '@/lib/ApiHandler';
import {Api_Signup_Url, AuthLoginUrl} from '@/utils/apiAccessUrls';

export const useAuthApi = () => {
    const signInApiCall = (email: string, secret: string) => {
        return sendPostRequest(AuthLoginUrl, {
            email,
            password: secret,
        });

    };
    const signUpApiCall = (email: string, secret: string,name:string) => {
        return sendPostRequest(Api_Signup_Url, {
            email,
            password: secret,
            name,
        });

    };

    return {signInApiCall, signUpApiCall};
};
