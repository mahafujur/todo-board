import {useCategory} from "@/hooks/useCategory.ts";
import {useEffect} from "react";
import PrivateLayout from "@/components/Organisms/Layout/PrivateLayou.tsx";
import useBoardStore from "@/store/useBoardStore.ts";
import {useTicket} from "@/hooks/useTicket.ts";

const TodoBoard = () => {
    const {getAllCategories} = useCategory()
    const {getAllTickets} = useTicket()
    const {updateCategories, categories,setTickets,tickets} = useBoardStore()

    useEffect(() => {
        getAllCategories().then((response) => {
                const categories = response?.map(({name, _id}) => ({name: name, id: _id}))
                updateCategories(categories || [])
            }
        ).catch((error) => console.log(error?.response?.status))
    }, []);

    useEffect(() => {
        getAllTickets().then((response) => {
                const ticketsResponse= response?.map((data)=>{
                    delete data._id;
                    delete  data.__v;
                    delete  data.user;
                    return {...data,category: data.category._id, id: data._id};
                })
               setTickets(ticketsResponse || [])
            }
        ).catch((error) => console.log(error?.response?.status))
    }, []);

    console.log(tickets,'tickets')
    return (
        <PrivateLayout>
            <div className={'bg-red-500 h-screen'}></div>
        </PrivateLayout>
    )
}

export default TodoBoard;
