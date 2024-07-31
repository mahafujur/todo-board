import {useCategory} from "@/hooks/useCategory.ts";
import {useEffect} from "react";
import PrivateLayout from "@/components/Organisms/Layout/PrivateLayou.tsx";
import useBoardStore from "@/store/useBoardStore.ts";
import {useTicket} from "@/hooks/useTicket.ts";

const TodoBoard = () => {
    const {getAllCategories} = useCategory()
    const {getAllTickets} = useTicket()
    const {setCategories, categories, setTickets, tickets} = useBoardStore()

    useEffect(() => {
        getAllCategories().then((response) => {
                const categories = response?.map(({name, _id}) => ({name: name, id: _id}))
                setCategories(categories || [])
            }
        ).catch((error) => console.log(error?.response?.status))
    }, []);

    useEffect(() => {
        getAllTickets().then((response) => {
               const filteredData=  response?.map(({_id, category, title, description, expiryDate}) => ({
                    id: _id,
                    title: title,
                    expiryDate: expiryDate,
                    description: description,
                    category: category?._id || 'Todo',
                }))
                setTickets(filteredData || [])
            }
        ).catch((error) => console.log(`error = ${error?.response?.status}`))
    }, []);

     return (
        <PrivateLayout>
            <div className={' pt-[10px]'}>
                {tickets.map((ticket) => ticket.title)}
            </div>
        </PrivateLayout>
    )
}

export default TodoBoard;
