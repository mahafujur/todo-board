import React, {Fragment} from 'react';
import SEO from "@/components/Templates/SEO.tsx";
import Head from "next/head";
import Header from "@/components/Organisms/Header";
import ModalManager from "@/components/Templates/ModalManager.tsx";

interface PrivateLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({children, title, description}) => {
    return (
        <Fragment>
            <SEO
                title={title || "Home | Your Todo App"}
                description={description || "Welcome to Your Todo App. Organize your tasks efficiently."}
                keywords={['todo', 'tasks', 'organization', 'productivity']}
            />
            <Head>
                <title>Todo Board</title>
                <meta name="description" content="Welcome to Todo Board"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Header/>
            <main className={'bg-accent50 min-h-screen'}>
                {children}
            </main>

            <ModalManager/>
        </Fragment>
    );
};

export default PrivateLayout;
