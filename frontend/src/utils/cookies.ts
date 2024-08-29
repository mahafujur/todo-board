import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { COOKIES } from '@/utils/constants.ts';

const getACookie = (key: string,decoded=false) => {
    const theCookie = getCookie(key);
    if (decoded && theCookie ) {
        return jwtDecode(theCookie as string); // Ensure type assertion
    }
    return theCookie;
};

const setACookie = (key: string, value: string, validity: number = 30) => {
    setCookie(key, value, {
        maxAge: validity * 24 * 60 * 60, // validity in seconds
        path: '/',
        domain: process.env.NEXT_PUBLIC_DOMAIN,
    });
};

const removeACookie = (key: string) => {
    deleteCookie(key, { path: '/' });
};

export { getACookie, setACookie, removeACookie };
