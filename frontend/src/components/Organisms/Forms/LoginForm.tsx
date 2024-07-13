import React from 'react';
import {Button} from "@/components/Atom";
import Link from "next/link";
import Input from "@/components/Atom/Input";
import {FormControl} from "@/components/Molecules/Form";
import useLoginForm from "@/hooks/useLoginForm";

const LoginForm: React.FC = () => {
    const {
        onSubmit,
        loading,
        hookFormProps: {handleSubmit, setValue, errors},
    } = useLoginForm();

    return (
        <div className="max-w-md w-full mx-auto">

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <FormControl
                        required={true}
                        label="Email"
                        htmlFor="email"
                        className="mb-4"
                        errors={errors?.email?.message ? [errors?.email?.message] : undefined}
                    >
                        <Input
                            id="email"
                            placeholder="Your email"
                            onChange={({target: {value}}: any) => setValue('email', value)}
                            autoComplete="on"
                        />
                    </FormControl>
                </div>
                <div className="mb-6">
                    <FormControl
                        required={true}
                        label="Password"
                        htmlFor="password"
                        className="mb-4"
                        errors={
                            errors?.password?.message ? [errors?.password?.message] : undefined
                        }
                    >
                        <Input
                            id="password"
                            placeholder="Your Password"
                            onChange={({target: {value}}: any) =>
                                setValue('password', value)
                            }
                            autoComplete="on"
                            type="password"
                        />
                    </FormControl>
                </div>
                <div className="w-full">
                    <Button loading={loading} htmlType={'submit'} variant={'blue'} size={'large'} type={'primary'} fullWidth>
                        Sign In
                    </Button>
                </div>
            </form>
            <div className={'flex justify-center items-center'}>
                <Link href={'/signup'} className={'underline text-blue-600'}> Create a account </Link>
            </div>
        </div>
    );
};

export default LoginForm;
