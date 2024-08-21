import {sendPostRequest} from '@/lib/ApiHandler';
import {API_SignOut_Url, Api_Signup_Url, AuthLoginUrl} from '@/utils/apiAccessUrls';

export const useAuthApi = () => {
    const signInApiCall = (email: string, secret: string) => {
        return sendPostRequest(AuthLoginUrl, {
            email,
            password: secret,
        });

    };
    const signUpApiCall = (email: string, secret: string) => {
        return sendPostRequest(Api_Signup_Url, {
            email,
            password: secret,
        });

    };
    const signOutApiCall = () => {
        return sendPostRequest(API_SignOut_Url,{});
    };

    return {signInApiCall,signUpApiCall,signOutApiCall };
};
