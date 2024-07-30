import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Button, Typography} from "@/components/Atom";
import useBoardStore from "@/store/useBoardStore.ts";

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    expiryDate: yup.date().required('Expiry Date is required').typeError('Invalid date'),
    categoryId: yup.string().required('Category is required'),
});

interface TicketCreateModalProps {
}

const CreateTicketCard: React.FC<TicketCreateModalProps> = () => {
    const { setModalOpen, addTicket, categories} = useBoardStore();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            expiryDate: '',
            categoryId: '',
        },
    });

    const onSubmit = (data: any) => {
        addTicket({...data, id: Date.now().toString()});
        setModalOpen(false);
        reset();
    };

    return (
        <div className={'mx-auto px-4 md:px-6 my-8 '}>

            <div
                className=" w-full  overflow-hidden text-left align-middle transition-all transform ">
                <Typography
                    variant={{
                        web:
                            'Title-40-Semibold',
                        mobile: 'Title-20-Semibold'
                    }} className="text-lg font-medium leading-6 text-gray-900" tag={'h3'}>
                    Create Ticket
                </Typography>
            </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        <label className="block text-sm font-bold mb-2">Title</label>
                        <input
                            type="text"
                            {...register('title')}
                            className="w-full p-2 border rounded"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold mb-2">Description</label>
                        <textarea
                            {...register('description')}
                            className="w-full p-2 border rounded"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold mb-2">Expiry Date</label>
                        <input
                            type="date"
                            {...register('expiryDate')}
                            className="w-full p-2 border rounded"
                        />
                        {errors.expiryDate && (
                            <p className="text-red-500 text-xs mt-1">{errors.expiryDate.message}</p>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold mb-2">Category</label>
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
                    <div className="mt-4 flex justify-end">
                        <Button variant={'pink'} size={'medium'} onClick={() => setModalOpen(false)} className="mr-2"
                                type={'primary'}>
                            Cancel
                        </Button>
                        <Button type={'primary'} variant={'blue'} size={'medium'}>Create</Button>
                    </div>
                </form>
            </div>

    );
};

export default CreateTicketCard;
