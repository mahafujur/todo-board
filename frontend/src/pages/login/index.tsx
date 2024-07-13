import SEO from "@/Components/Templates/SEO";
import React from "react";


const Login = () => {

    return(
        <div className={'bg-white min-h-screen'}>
            <SEO
                title="Login | Todo App"
                description="Welcome to Your Todo App. Organize your tasks efficiently."
                keywords={['todo', 'tasks', 'organization', 'productivity']}
            />


        </div>
    )
}

export default Login;
