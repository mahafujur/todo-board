import React from 'react';
import useBoardStore from '@/store/useBoardStore';
import BlankBoardPage from "@/components/Templates/BlankBoardPage.tsx";
import TicketListRow from "@/components/Organisms/Tickets/TicketListRow.tsx";


const Board: React.FC = () => {
    const {categories} = useBoardStore();
    console.log(categories,'cat')

    return (
        <div className="flex space-x-4 overflow-x-scroll p-4">
            {categories?.length && categories?.map((category) => (
                <TicketListRow key={category.id} category={category}/>
            )) || <BlankBoardPage/>}
        </div>
    );
};

export default Board;
