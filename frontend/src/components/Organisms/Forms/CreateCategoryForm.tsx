import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Button, Input, Typography} from "@/components/Atom";
import useBoardStore from "@/store/useBoardStore.ts";
import {FormControl} from "@/components/Molecules/Form";
import {useCategory} from "@/hooks/useCategory.ts";


const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
});

interface CategoryCreateModalProps {
    title?: string
}

const CreateTicketForm: React.FC<CategoryCreateModalProps> = ({title}) => {
    const {categories, setCategoryModalOpen, categoryModalOpen} = useBoardStore();
    const [loader,setLoader]=useState(false)
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

    const onSubmit = (data) => {
        const {title} = data;
        setLoader(true)
        createACategory(title).then((response) => {
                const categories = response
                console.log(response)
                // updateCategories(categories || [])
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
                    <Button  disabled={loader} variant={'pink'} size={'medium'} onClick={() => setCategoryModalOpen(false)} className="mr-2"
                            type={'primary'}>
                        Cancel
                    </Button>
                    <Button loading={loader} disabled={loader} type={'primary'} variant={'blue'} size={'medium'}>Create</Button>
                </div>
            </form>
        </div>

    );
};

export default CreateTicketForm;
