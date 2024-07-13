import Head from 'next/head';
import React from "react";
import Link from "next/link";
import SEO from "@/components/Templates/SEO";

const Home: React.FC = () => {
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

                <div className="space-x-4 w-full mx-auto">
                    <Link href="/login"
                          className="w-full  min-w-[200px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transition-colors duration-300">Login</Link>
                    <Link href="/signup"
                          className="w-full  min-w-[200px] bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg shadow-lg transition-colors duration-300">Sign
                        Up</Link>
                </div>
            </main>
        </div>
    );
};

export default Home;
