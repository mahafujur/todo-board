import Head from 'next/head';
import React, {useEffect, useState} from "react";
import Link from "next/link";
import SEO from "@/components/Templates/SEO";
import {isLoggedIn} from "@/utils/useManager";
import {Button} from "@/components/Atom";
import {useWorkspace} from "@/hooks/useWorkspace.ts";

const LoginButtonsCard = () => {
    const loggedIn = isLoggedIn()
    const {createAWorkspace} = useWorkspace()

    const handleCreateWorkspace = () => {
        createWorkspace().
    }

    if (loggedIn) {
        return (
            <div className={'flex flex-col'}>
                <Button variant={'blue'} size={'large'} type={'primary'} onClick={handleCreateWorkspace}>Create a
                    workspace</Button>
                <br/>

                <ul>
                    <li>
                        <Link href="/board"
                              className="w-auto mx-auto text-center min-w-[200px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-4   rounded-lg shadow-lg transition-colors duration-300">Visit
                            Your Board</Link>
                    </li>
                </ul>


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
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to Todo Board</h1>
                <p className="text-gray-600 mb-8">Organize your tasks efficiently with Todo Board.</p>

                {!loader && <LoginButtonsCard/>}
            </main>
        </div>
    );
};

export default Home;
