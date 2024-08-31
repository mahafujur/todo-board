import {sendGetRequest, sendPostRequest} from '@/lib/ApiHandler';
import {Api_Workspace_Url} from '@/utils/apiAccessUrls';

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

    const addUserToWorkSpaces = (userId: string, workspaceId: string) => {
        return sendGetRequest(Api_Workspace_Url + `/add-user/${workspaceId}`,);

    }
    return {createAWorkspace, getMyWorkspaces, getWorkSpaceMembers, addUserToWorkSpaces};
};
