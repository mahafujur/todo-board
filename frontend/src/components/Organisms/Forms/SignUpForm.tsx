import React from 'react';
import {Button, Input} from "@/components/Atom";
import Link from "next/link";

import {FormControl} from "@/components/Molecules/Form";
import {FieldPath, FieldPathValue} from "react-hook-form";
import {LoginFormProps} from "@/types/forms";
import useSignUpForm from "@/hooks/useSignUpForm.ts";

const SignUPForm: React.FC = () => {
    const {
        onSubmitSignUp,
        loading,
        hookFormProps: {handleSubmit, setValue, errors},
    } = useSignUpForm();

    return (
        <div className="max-w-md w-full mx-auto">

            <form onSubmit={handleSubmit(onSubmitSignUp)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div>
                    <FormControl
                        required={true}
                        label="Email"
                        htmlFor="email"
                        className="mb-4"
                        errors={errors?.email?.message && errors?.email?.message?.length > 0 ? [errors?.email?.message as string] : []}
                    >
                        <Input
                            id="email"
                            placeholder="Your email"
                            onChange={({target: {value}}) => {
                                setValue('email' as FieldPath<LoginFormProps>, value as FieldPathValue<LoginFormProps, 'email'>);
                            }}
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
                            errors?.password?.message && errors?.password?.message?.length > 0 ? [errors?.password?.message as string] : undefined
                        }
                    >
                        <Input
                            status={errors?.password?.message && errors?.password?.message?.length > 0 ? 'error' : 'default'}
                            id="password"
                            placeholder="Your Password"
                            onChange={({target: {value}}) => {
                                setValue('password' as FieldPath<LoginFormProps>, value as FieldPathValue<LoginFormProps, 'email'>);
                            }}
                            autoComplete="on"
                            type="password"
                        />
                    </FormControl>
                </div>
                <div className="w-full">
                    <Button loading={loading} htmlType={'submit'} variant={'blue'} size={'large'} type={'primary'}
                            fullWidth>
                        Sign Up
                    </Button>
                </div>
            </form>
            <div className={'flex justify-center items-center'}>
                <Link href={'/login'} className={'underline text-blue-600'}> Already have a account? </Link>
            </div>
        </div>
    );
};

export default SignUPForm;
