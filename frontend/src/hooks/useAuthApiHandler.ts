import {sendPostRequest} from '@/lib/ApiHandler';
import {AuthLoginUrl} from '@/utils/apiAccessUrls';

export const useLoginApiHandler = () => {
    const signInApiCall = async (email: string, secret: string) => {
        console.log(email, secret, 'secret...')
        try {
            return await sendPostRequest(AuthLoginUrl, {
                email,
                secret,
            });

        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    return {signInApiCall};
};
