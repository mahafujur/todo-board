import {Typography} from "@/components/Atom";
import Image from "next/image";
import templateIcon from '../../assets/templateIcon.svg';

const BoardTemplates = () => {

    return(
        <div className={'flex items-center gap-x-2 '}>

            <Image src={templateIcon as string} alt={'Template Icon'} width={24} height={24} />
            <Typography tag={'h3'} variant={{
                web:"Title-24-Semibold",
                mobile:"Title-18-Semibold"
            }
            }>New and notable templates</Typography>

        </div>
    )
}

export default BoardTemplates;
