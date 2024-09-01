import React, {FC, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Button, Input, Typography} from "@/components/Atom";
import useBoardStore from "@/store/useBoardStore.ts";
import {FormControl} from "@/components/Molecules/Form";
import {useWorkspace} from "@/hooks/useWorkspace.ts";
import {IWorkspace} from "@/types/workspace.ts";
import {User} from "@/types/user.ts";


const schema = yup.object().shape({
    email: yup.string().email().required('Email required'),
});

interface Props {
    workspaceId: string;
    onClose: () => void;
}

const AddMemberForm: FC<Props> = ({workspaceId, onClose}) => {
    const [loader, setLoader] = useState(false)
    const {updateWorkspace} = useBoardStore();
    const {addUserToWorkSpaces} = useWorkspace()
    const {
        handleSubmit,
        reset,
        setValue,
        setError,
        formState: {errors,},
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        const email = data.email;
        setLoader(true)
        addUserToWorkSpaces(email, workspaceId).then((res) => {
            const newWorkspace:IWorkspace= {
                name: res.name,
                users:res.users,
                id:workspaceId
            }
            updateWorkspace(newWorkspace)
            onClose()
        }).catch((err) => {
            console.log(err)
            const message = err?.response?.data?.message || '';
            setError('email', {message: message})
        }).finally(() => {
            setLoader(false)
            onClose()
        })

        reset();
    };

    return (
        <div className={' mx-auto px-4 md:px-6 mt-5 max-h-[650px] overflow-y-auto'}>
            <div
                className=" w-full  overflow-hidden text-left align-middle transition-all transform ">
                <Typography
                    variant={{
                        web:
                            'Title-24-Semibold',
                        mobile: 'Title-16-Semibold'
                    }} className="" tag={'h3'}>
                    Add a member on your workspace
                </Typography>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-2">
                    <FormControl
                        required={true}
                        label="User email"
                        htmlFor="email"
                        className="mb-4"
                        errors={errors.email && errors?.email?.message ? [errors?.email?.message as string] : []}
                    >
                        <Input
                            isEmail={true}
                            id="title"
                            type={'email'}
                            placeholder="Email"
                            onChange={({target: {value}}) => {
                                setValue('email', value);

                            }}
                        />
                    </FormControl>

                </div>

                <div className="flex justify-end my-5">
                    <Button disabled={loader} variant={'pink'} size={'medium'} onClick={() => onClose()}
                            className="mr-2"
                            type={'primary'}>
                        Cancel
                    </Button>
                    <Button htmlType={'submit'} loading={loader} disabled={loader} type={'primary'} variant={'blue'}
                            size={'medium'}>Add</Button>
                </div>
            </form>
        </div>

    )
        ;
};

export default AddMemberForm;
