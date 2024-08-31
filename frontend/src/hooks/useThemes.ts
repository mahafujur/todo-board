import {sendGetRequest, sendPostRequest} from '@/lib/ApiHandler';
import {Api_Theme_Url, Api_Workspace_Url} from '@/utils/apiAccessUrls';

export const useThemes = () => {
    const getThemes = () => {
        return sendGetRequest(Api_Theme_Url);

    };
    const installTheme = (id:string,workspaceId:string) => {
        return sendPostRequest(Api_Theme_Url , { themeId:id,workspaceId:workspaceId});

    }

    return { getThemes,installTheme};
};
