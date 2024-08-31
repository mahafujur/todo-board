import {Typography} from "@/components/Atom";
import Image from "next/image";
import templateIcon from '../../assets/templateIcon.svg';
import BoardTemplates from "@/components/Templates/BoardTemplates.tsx";

const BlankBoardPage = () => {

    return(
        <div className={'flex items-center gap-x-2 '}>
           <BoardTemplates/>
        </div>
    )
}

export default BlankBoardPage;
