import {sendGetRequest, sendPostRequest, sendPutRequest} from '@/lib/ApiHandler';
import {Api_Theme_Url, Api_Workspace_Url} from '@/utils/apiAccessUrls';

export const useWorkspace = () => {
    const createAWorkspace = (name: string) => {
        return sendPostRequest(Api_Workspace_Url, {name});
    };
    const getMyWorkspaces = () => {
        return sendGetRequest(Api_Workspace_Url);

    };
    const getWorkSpaceMembers = (workspaceId: string) => {
        return sendGetRequest(Api_Workspace_Url + `/${workspaceId}`,);
    }
    const addUserToWorkSpaces = (email: string, workspaceId: string) => {
        return sendPutRequest(Api_Workspace_Url + `/add-user/${workspaceId}`, {email: email});

    }
    const installTheme = (id: string, workspaceId: string) => {
        return sendPostRequest(Api_Theme_Url, {themeId: id, workspaceId: workspaceId});

    }

    return {createAWorkspace, getMyWorkspaces, getWorkSpaceMembers, addUserToWorkSpaces, installTheme};
};
