import {jwtDecode} from 'jwt-decode';
import {destroyCookie, parseCookies, setCookie} from "nookies";
import {COOKIES} from "@/types/generalTypes.ts";


const getACookie = (key: string) => {
    const cookies = parseCookies();
    const theCookie = cookies?.[key] ? cookies[key] : null;
    if (key === COOKIES.TOKEN && theCookie) return jwtDecode(theCookie);
    else return theCookie;
};

const setACookie = (key: string, value: string, validity: number = 30) => {
    setCookie(null, key, value, {
        maxAge: validity * 24 * 60 * 60,
        path: '/',
        domain: process.env.NEXT_PUBLIC_DOMAIN
    });
};

function removeACookie(key: string) {
    const maxAge = 30 * 24 * 60 * 60 * 1000;
    destroyCookie(null, key, {path: '/', maxAge});
}

export {getACookie, setACookie, removeACookie}
