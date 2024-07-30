import {Button} from "@/components/Atom";
import {useCategory} from "@/hooks/useCategory.ts";

const TodoBoard = () => {

    const {createACategory} = useCategory()
    const handleCreateCategory = () => {
        createACategory('Country').then(r => console.log(r)).catch((error) => console.log(error?.response?.status))
    }

    return (
        <div>
            <Button onClick={handleCreateCategory} variant={'blue'} size={'large'} type={'primary'}>Create
                Category</Button>
        </div>
    )
}

export default TodoBoard;
