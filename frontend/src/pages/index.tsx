import Head from 'next/head';
import React, {useEffect, useState} from "react";
import Link from "next/link";
import SEO from "@/components/Templates/SEO";
import {isLoggedIn} from "@/utils/useManager";
import {Button, Typography} from "@/components/Atom";
import useBoardStore from "@/store/useBoardStore.ts";
import Modal from "@/components/Organisms/Modal";
import CreateWorkspaceForm from "@/components/Organisms/Forms/CreateWorkspaceForm.tsx";
import {useWorkspace} from "@/hooks/useWorkspace.ts";

const LoginButtonsCard = () => {
    const loggedIn = isLoggedIn()
    const {getMyWorkspaces} = useWorkspace()
    const {setWorkSpaceModalOpen, workspaces, workSpaceModalOpen, setWorkspaces} = useBoardStore()

    const handleCreateWorkspace = () => {
        setWorkSpaceModalOpen(true)
    }

    useEffect(() => {
        if (loggedIn) getMyWorkspaces().then((response) => setWorkspaces(response?.map((wk) => ({
            name: wk.name,
            id: wk._id,
            users: wk.users
        })))).catch((er) => console.error(er))
    }, [loggedIn]);

    if (loggedIn) {
        return (
            <div className={'flex flex-col'}>
                <ul className={'flex gap-3 '}>
                    {workspaces?.length ? workspaces?.map(({name, id}, index) => {

                        return <li key={index} className={' mt-4'}>
                            <Link href={`/board/${id}`}
                                  className="bg-white p-5  border shadow-md rounded-md hover:shadow-2xl hover:bg-gray100 w-auto text-left text-secondary600 min-h-[200px] ">-> Workspace
                                {index+1} : {name}</Link>
                        </li>
                    }) : ''}
                </ul>

                <div className={'flex flex-col gap-y-1 mt-7'}>
                    <Typography tag={'h4'} variant={{
                        web: "Title-16-Semibold",
                        mobile: 'Title-16-Semibold'
                    }}>Create your own workspace,if you don't have any!</Typography>
                    <Button fullWidth={false} variant={'blue'} size={'medium'} type={'outline'}
                            onClick={handleCreateWorkspace}>+ Create a
                        workspace</Button>
                </div>


                <Modal title={'Build your workspace'} open={workSpaceModalOpen}
                       onCancel={() => setWorkSpaceModalOpen(false)}>
                    <CreateWorkspaceForm/>
                </Modal>

            </div>)
    }
    return (
        <div className="space-x-4 w-full mx-auto">
            <Link href="/login"
                  className="w-full  min-w-[200px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transition-colors duration-300">Login</Link>
            <Link href="/signup"
                  className="w-full  min-w-[200px] bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg shadow-lg transition-colors duration-300">Sign
                Up</Link>
        </div>
    )
}
const Home: React.FC = () => {
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setLoader(false)
    }, []);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <SEO
                title="Home | Your Todo App"
                description="Welcome to Your Todo App. Organize your tasks efficiently."
                keywords={['todo', 'tasks', 'organization', 'productivity']}
            />
            <Head>
                <title>Todo Board</title>
                <meta name="description" content="Welcome to Todo Board"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Todo Board</h1>
                <p className="text-gray-600 mb-4">Organize your tasks efficiently with Todo Board.</p>

                {!loader && <LoginButtonsCard/>}
            </main>
        </div>
    );
};

export default Home;
