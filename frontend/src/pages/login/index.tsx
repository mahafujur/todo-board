import SEO from "@/components/Templates/SEO";
import React from "react";
import {LoginForm} from "@/components/Organisms/Forms";


const Login = () => {

    return(
        <div className={'bg-white min-h-screen'}>
            <SEO
                title="Login | Todo App"
                description="Welcome to Your Todo App. Organize your tasks efficiently."
                keywords={['todo', 'tasks', 'organization', 'productivity']}
            />

            <div className="bg-gray-400 bg-opacity-50 min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center">Sign in to Your Account</h2>
                    <LoginForm/>
                </div>
            </div>
        </div>
    )
}

export default Login;
