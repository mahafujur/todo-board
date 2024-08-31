import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Button, Input, Typography} from "@/components/Atom";
import useBoardStore from "@/store/useBoardStore.ts";
import {FormControl} from "@/components/Molecules/Form";
import {useWorkspace} from "@/hooks/useWorkspace.ts";


const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
});

type FormType = {
    title: string;
}

interface CategoryCreateModalProps {
    title?: string
}

const CreateWorkspaceForm: React.FC<CategoryCreateModalProps> = ({title}) => {
    const {setWorkSpaceModalOpen, setWorkspaces} = useBoardStore();
    const [loader, setLoader] = useState(false)
    const {createAWorkspace} = useWorkspace()
    const {
        handleSubmit,
        reset,
        setValue,
        formState: {errors,},
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {},
    });

    const onSubmit = (data: FormType) => {
        const {title} = data || {};
        setLoader(true)
        createAWorkspace(title).then((response) => {
                setWorkspaces(response?.map((wk)=>({ name:wk.name,id:wk._id,users:wk.users})))
            }
        ).catch((error) => console.log(error?.response?.status)).finally(() => {
            setWorkSpaceModalOpen(false)
            setLoader(false)
        });
        reset();
    };

    return (
        <div className={' mx-auto px-4 md:px-6 mt-5 '}>
            {title ? <div
                className=" w-full  overflow-hidden text-left align-middle transition-all transform ">
                <Typography
                    variant={{
                        web:
                            'Title-24-Semibold',
                        mobile: 'Title-16-Semibold'
                    }} className="" tag={'h3'}>
                    {title}
                </Typography>
            </div> : null}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-2">
                    <FormControl
                        required={true}
                        label="Name"
                        htmlFor="title"
                        className="mb-4"
                        errors={errors.title && errors?.title?.message ? [errors?.title?.message as string] : []}
                    >
                        <Input
                            id="title"
                            placeholder="Your workspace"
                            onChange={({target: {value}}) => {
                                setValue('title', value);
                            }}
                        />
                    </FormControl>


                </div>
                <div className="flex justify-end my-5">
                    <Button disabled={loader} variant={'pink'} size={'medium'}
                            onClick={() => setWorkSpaceModalOpen(false)} className="mr-2"
                            type={'primary'}>
                        Cancel
                    </Button>
                    <Button htmlType={'submit'} loading={loader} disabled={loader} type={'primary'} variant={'blue'}
                            size={'medium'}>Create</Button>
                </div>
            </form>
        </div>

    );
};

export default CreateWorkspaceForm;
