import {COOKIES} from "@/utils/constants";
import {getACookie, removeACookie} from "@/utils/cookies";


const isLoggedIn = () => {
    const userToken = getACookie(COOKIES.TOKEN)
    return !!userToken;
}
const logOut = () => {
    removeACookie(COOKIES.TOKEN)
}

export {isLoggedIn,logOut}
