import {User} from "@/types/user.ts";

export interface IWorkspace {
    name: string;
    users: User[];
    id:string;
}
