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
import {useRouter} from "next/router";
import {IWorkspace} from "@/types/workspace.ts";

const Workspaces = () => {
    const router = useRouter();
    const loggedIn = isLoggedIn()
    const {getMyWorkspaces} = useWorkspace()
    const {setWorkSpaceModalOpen, workspaces, workSpaceModalOpen, setWorkspaces} = useBoardStore()

    const handleCreateWorkspace = () => {
        setWorkSpaceModalOpen(true)
    }

    useEffect(() => {
        if (loggedIn) getMyWorkspaces().then((response) => setWorkspaces(response?.map((wk: any) => ({
            name: wk.name,
            id: wk._id,
            users: wk.users
        })))).catch((er) => console.error(er))
    }, [loggedIn]);

    if (loggedIn) {
        return (
            <div className={'flex flex-col w-full'}>
                {workspaces?.length ? <Typography tag={'h4'} className={'text-gray600'} variant={{
                    web: "Title-16-Bold",
                    mobile: 'Title-16-Bold'
                }}>Your workspaces</Typography> : null}

                <div className={'flex flex-col w-full gap-y-1 mt-2 '}>
                    {workspaces?.length ? workspaces?.map(({name, id}, index) => {
                        return <div key={id} className={'w-full'} onClick={() => router.push("/workspace/" + id)}>
                            <div
                                className="bg-white p-5 cursor-pointer border shadow-md rounded-md hover:shadow-2xl hover:bg-gray100 w-auto text-left text-secondary600  ">
                                Workspace {index + 1} : {name}</div>
                        </div>
                    }) : ''}
                </div>

                <div className={'flex flex-col gap-y-1 mt-7'}>
                    <Typography tag={'h4'} className={'text-gray600'} variant={{
                        web: "Title-16-Regular",
                        mobile: 'Title-16-Regular'
                    }}>Create your own workspace,if you do not have any!</Typography>
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
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

            <main className="p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Todo Board</h1>
                <p className="text-gray-600 mb-4">Organize your tasks efficiently with Todo Board.</p>

                {!loader && <Workspaces/>}
            </main>

            <footer  className={'py-1 bottom-0  fixed mb-2 '}>
                <div className={'text-primary300 hover:underline '}>
                    <span className={'text-pink-500'}>Github: </span> <a href={'https://github.com/mahafujur/todo-board'}>https://github.com/mahafujur/todo-board </a>
                </div>
            </footer>


        </div>
    );
};

export default Home;
