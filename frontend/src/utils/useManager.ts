import {getACookie} from "@/utils/cookies.ts";
import {COOKIES} from "@/types/generalTypes.ts";


const isLoggedIn = () => {
    const userToken = getACookie(COOKIES.TOKEN)
    return !!userToken;
}


export {isLoggedIn}
