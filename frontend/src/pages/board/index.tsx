import {useCategory} from "@/hooks/useCategory.ts";
import {useEffect} from "react";
import PrivateLayout from "@/components/Organisms/Layout/PrivateLayou.tsx";
import useBoardStore from "@/store/useBoardStore.ts";

const TodoBoard = () => {
    const {getAllCategories} = useCategory()
    const {updateCategories, categories} = useBoardStore()

    useEffect(() => {
        getAllCategories().then((response) => {
                const categories = response?.map(({name, _id}) => ({name: name, id: _id}))
                updateCategories(categories || [])
            }
        ).catch((error) => console.log(error?.response?.status))
    }, []);
    console.log(categories)

    return (
        <PrivateLayout>dasf
            <div className={'bg-red-500 h-screen'}></div>
        </PrivateLayout>
    )
}

export default TodoBoard;
