import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Button, Input, Typography} from "@/components/Atom";
import useBoardStore from "@/store/useBoardStore.ts";
import {FormControl} from "@/components/Molecules/Form";
import {useCategory} from "@/hooks/useCategory.ts";
import {useRouter} from "next/router";


const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
});

type FormType={
    title:string;
}
interface CategoryCreateModalProps {
    title?: string
}

const CreateTicketForm: React.FC<CategoryCreateModalProps> = ({title}) => {
    const router=useRouter();
    const workspaceId=router.query.id;
    const { setCategoryModalOpen, updateCategory} = useBoardStore();
    const [loader, setLoader] = useState(false)
    const {createACategory} = useCategory()
    const {
        handleSubmit,
        reset,
        setValue,
        formState: {errors,},
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {},
    });

    const onSubmit = (data:FormType) => {
        const {title} = data || {};
        setLoader(true)
        createACategory(title,workspaceId as string).then((response) => {
                console.log(response)
                const newCategory = {id: response._id as string, name: response.name as string}
                updateCategory(newCategory)
            }
        ).catch((error) => console.log(error?.response?.status)).finally(() => {
            setCategoryModalOpen(false)
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
                            placeholder="Your category"
                            onChange={({target: {value}}) => {
                                setValue('title', value);
                            }}
                        />
                    </FormControl>


                </div>
                <div className="flex justify-end my-5">
                    <Button disabled={loader} variant={'pink'} size={'medium'}
                            onClick={() => setCategoryModalOpen(false)} className="mr-2"
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

export default CreateTicketForm;
