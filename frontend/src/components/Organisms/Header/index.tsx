import Image from "next/image";
import Logo from '@/assets/logo.png'
import React, {useEffect} from 'react';
import Icon from "@/Icons";
import {Button} from "@/components/Atom";
import useBoardStore from "@/store/useBoardStore.ts";
import {useRouter} from "next/router";
import {removeACookie} from "@/utils/cookies.ts";
import {COOKIES} from "@/utils/constants.ts";
import {useWorkspace} from "@/hooks/useWorkspace.ts";

const Header = () => {
    const router = useRouter();
    const {ticketModalOpen, setTicketModal, setCategoryModalOpen, categoryModalOpen, setWorkspaces} = useBoardStore()
    const {getMyWorkspaces} = useWorkspace()

    const handleCreateATicket = () => {
        if (!ticketModalOpen) setTicketModal(true)
    }
    const handleCreateACategory = () => {
        if (!categoryModalOpen) setCategoryModalOpen(true)
    }
    const handleLogout = async () => {
        try {
            removeACookie(COOKIES.TOKEN)
            // await signOutApiCall();
            router.push('/login');
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getMyWorkspaces().then((response) => setWorkspaces(response?.map((wk) => ({
            name: wk.name,
            id: wk._id,
            users: wk.users
        })))).catch((er) => console.error(er))
    }, []);

    return (
        <div
            className={'px-4 fixed top-0 left-0 right-0 z-10 overflow-hidden md:px-6 shadow-xl bg-primary50 h-[80px] flex justify-between flex-shrink w-full items-center'}>

            <div className={'flex items-center gap-x-2'}>
                <Image src={Logo as unknown as string} width={48} height={48} alt={'Todo'}/>
                <Button className={'ml-3 md:ml-6'} onClick={handleCreateATicket} variant={'blue'} size={'medium'}
                        type={'outline'}>
                    Create +</Button>
                <Button className={'ml-3 md:ml-6'} onClick={handleCreateACategory} variant={'blue'} size={'small'}
                        type={'text'}>
                    Add category</Button>

            </div>
            <div className={'flex items-center gap-x-2'}>
                <Button className={'ml-3 md:ml-6'} onClick={handleLogout} variant={'white'} size={'small'}
                        type={'outline'}>
                    Logout</Button>
                <Icon name={'avatar'} className={'w-12 h-12'}/>
            </div>

        </div>
    )
}

export default Header;
