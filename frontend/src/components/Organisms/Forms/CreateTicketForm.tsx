import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Button, Input, Typography} from "@/components/Atom";
import useBoardStore from "@/store/useBoardStore.ts";
import {FormControl, FormLabel} from "@/components/Molecules/Form";
import {useTicket} from "@/hooks/useTicket.ts";
import {Ticket} from "@/types/ticket.ts";
import {useRouter} from "next/router";


const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    expiryDate: yup.date().required('Expiry Date is required').typeError('Invalid date'),
    categoryId: yup.string().required('Category is required'),
});

interface TicketCreateModalProps {
}

const CreateTicketForm: React.FC<TicketCreateModalProps> = () => {
    const router=useRouter();
    const [loader, setLoader] = useState(false)
    const {setTicketModal, addTicket, categories, setCategoryModalOpen, categoryModalOpen} = useBoardStore();
    const {createATicket} = useTicket()
    const workspaceId=router.query.id;
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {errors,},
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        setLoader(true)
        createATicket({...data,workspaceId: workspaceId}).then((res) => {
            addTicket({
                id: res._id,
                title: res.title,
                expiryDate: res.expiryDate,
                description: res.description,
                category: res.category,

            } as Ticket);
        }).catch((err) => console.log(err)).finally(() => {
            setLoader(false)
            setTicketModal(false)
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
                    Create Ticket
                </Typography>
            </div>
            {categories?.length ?
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-2">
                        <FormControl
                            required={true}
                            label="Title"
                            htmlFor="title"
                            className="mb-4"
                            errors={errors.title && errors?.title?.message ? [errors?.title?.message as string] : []}
                        >
                            <Input
                                id="title"
                                type={'textarea'}
                                placeholder="Your title"
                                onChange={({target: {value}}) => {
                                    setValue('title', value);

                                }}
                            />
                        </FormControl>

                    </div>
                    <div className="mt-2">
                        <FormLabel>Description</FormLabel>
                        <textarea
                            {...register('description')}
                            className="w-full p-2 border rounded px-1 py-1"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                        )}

                    </div>
                    <div className="mt-2">
                        <FormLabel>Expiry date </FormLabel>
                        <input
                            type="date"
                            {...register('expiryDate')}
                            className="w-full p-2 border rounded px-1"
                        />
                        {errors.expiryDate && (
                            <p className="text-red-500 text-xs mt-1">{errors.expiryDate.message}</p>
                        )}
                    </div>
                    <div className="mt-2">
                        <FormLabel>Category </FormLabel>
                        <select {...register('categoryId')} className="w-full p-2 border rounded">
                            <option value="">Select a category</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && (
                            <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>
                        )}
                    </div>
                    <div className="flex justify-end my-5">
                        <Button disabled={loader} variant={'pink'} size={'medium'} onClick={() => setTicketModal(false)}
                                className="mr-2"
                                type={'primary'}>
                            Cancel
                        </Button>
                        <Button htmlType={'submit'} loading={loader} disabled={loader} type={'primary'} variant={'blue'}
                                size={'medium'}>Create</Button>
                    </div>
                </form> : <div className={'flex flex-col gap-4 my-5'}>
                    <Typography tag={'p'} variant={{
                        web: 'Body-18-Semibold',
                        mobile: 'Body-14-Semibold'
                    }}>You don&apos;t have any category,please add one </Typography>
                    <Button variant={'blue'} size={'large'} type={'outline'} onClick={() => {
                        setTicketModal(false)
                        setCategoryModalOpen(true)
                    }}>Add
                        a category </Button>
                </div>
            }
        </div>

    )
        ;
};

export default CreateTicketForm;
