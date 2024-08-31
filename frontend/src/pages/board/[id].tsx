import {useCategory} from "@/hooks/useCategory.ts";
import {useEffect} from "react";
import PrivateLayout from "@/components/Organisms/Layout/PrivateLayou.tsx";
import useBoardStore from "@/store/useBoardStore.ts";
import {useTicket} from "@/hooks/useTicket.ts";
import Board from "@/components/Templates/Board.tsx";

const TodoBoard = () => {
    const {getAllCategories} = useCategory()
    const {getAllTickets} = useTicket()
    const {setCategories, categories, setTickets, tickets} = useBoardStore()

    useEffect(() => {
        getAllCategories().then((res) => {
                const response:any=res
                const categories = response?.map((data:any) => ({name: data.name, id: data._id }))
                setCategories(categories || [])
            }
        ).catch((error) => console.log(error?.response?.status))
    }, []);

    useEffect(() => {
        getAllTickets().then((res) => {
                const response:any=res;
                const filteredData=  response?.map((data:any) => ({
                    id: data._id,
                    title: data.title,
                    expiryDate: data.expiryDate,
                    description: data.description,
                    category: data.category?._id || 'Todo',
                }))
                setTickets(filteredData || [])
            }
        ).catch((error) => console.log(`error = ${error?.response?.status}`))
    }, []);

    return (
        <PrivateLayout>
            <Board />
        </PrivateLayout>
    )
}

export default TodoBoard;
