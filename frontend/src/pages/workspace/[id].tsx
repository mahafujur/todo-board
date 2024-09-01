import {useCategory} from "@/hooks/useCategory.ts";
import React, {useEffect, useState} from "react";
import PrivateLayout from "@/components/Organisms/Layout/PrivateLayou.tsx";
import useBoardStore from "@/store/useBoardStore.ts";
import {useTicket} from "@/hooks/useTicket.ts";
import Board from "@/components/Templates/Board.tsx";
import {useRouter} from "next/router";
import {Loader} from "@/components/Atom";
import WorkspaceSidebar from "@/components/Templates/WorkspaceSidebar.tsx";

const TodoBoard = () => {
    const router = useRouter();
    const {getAllCategories} = useCategory()
    const {getAllTickets} = useTicket()
    const {setCategories, categories, setTickets, tickets} = useBoardStore()
    const workspaceId = router.query.id;
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        if (workspaceId) {
            // Run both API calls in parallel using Promise.all
            Promise.all([
                getAllCategories(workspaceId as string)
                    .then((res) => {
                        const response: any = res;
                        const categories = response?.map((data: any) => ({name: data.name, id: data._id}));
                        setCategories(categories || []);
                    })
                    .catch((error) => console.log(error?.response?.status)),
                getAllTickets(workspaceId as string)
                    .then((res) => {
                        const response: any = res;
                        const filteredData = response?.map((data: any) => ({
                            id: data._id,
                            title: data.title,
                            expiryDate: data.expiryDate,
                            description: data.description,
                            category: data.category?._id || 'Todo',
                        }));
                        setTickets(filteredData || []);
                    })
                    .catch((error) => console.log(`error = ${error?.response?.status}`)),
            ])
                .finally(() => {
                    // Set loader to false after both API calls are complete
                    setLoader(false);
                });
        }
    }, [workspaceId]);


    if (loader) {
        return <Loader/>
    }

    return (
        <PrivateLayout>
            <div className={'flex w-full gap-x-3'}>
                <WorkspaceSidebar/>
                <Board/>
            </div>

        </PrivateLayout>
    )
}

export default TodoBoard;
