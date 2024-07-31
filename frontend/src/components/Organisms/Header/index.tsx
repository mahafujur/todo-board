import Image from "next/image";
import Logo from '@/assets/logo.png'
import React from 'react';
import Icon from "@/Icons";
import {Button} from "@/components/Atom";
import useBoardStore from "@/store/useBoardStore.ts";

const Header = () => {
    const {ticketModalOpen, setTicketModal,setCategoryModalOpen,categoryModalOpen} = useBoardStore()
    const handleCreateATicket = () => {
        if (!ticketModalOpen) setTicketModal(true)
    }
    const handleCreateACategory = () => {
        if (!categoryModalOpen) setCategoryModalOpen(true)
    }
    return (
        <div
            className={'px-4 fixed top-0 left-0 right-0 z-10 overflow-hidden md:px-6 shadow-xl bg-primary50 h-[80px] flex justify-between flex-shrink w-full items-center'}>

            <div className={'flex items-center gap-x-2'}>
                <Image src={Logo as string} width={48} height={48} alt={'Todo'}/>
                <Button className={'ml-3 md:ml-6'} onClick={handleCreateATicket} variant={'blue'} size={'medium'}
                        type={'outline'}>
                    Create +</Button>
                <Button className={'ml-3 md:ml-6'} onClick={handleCreateACategory} variant={'blue'} size={'small'}
                        type={'text'}>
                    Add category</Button>

            </div>
            <Icon name={'avatar'} className={'w-12 h-12'}/>

        </div>
    )
}

export default Header;
