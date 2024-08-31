import React, {FC, Fragment, useEffect, useState} from 'react';
import Modal from '@/components/Organisms/Modal';
import {DatePicker, Loader, Typography} from '@/components/Atom';
import {useTicket} from "@/hooks/useTicket.ts";
import {Ticket} from "@/types/ticket.ts";
import {WorkSpaceMembers} from "@/types/user.ts";
import Icon from "@/Icons";
import {EditableInput} from "@/components/Atom/Input";
import useBoardStore from "@/store/useBoardStore.ts";
import dynamic from "next/dynamic";

//@ts-ignore
const DescriptionEditor = dynamic(() => import('@/components/Molecules/Editor/DescriptionEditor'), {
    ssr: false, // Disable server-side rendering for this component
    loading: () => <p>Loading editor...</p>, // Optional: loading fallback
});


interface TicketDetailsViewProps {
    ticketId: string;
    onClose: () => void;
    ticketData: Ticket;
}

interface EditHistory {
    date: string;
    user: string;
    changes: string;
}

interface TicketDetails extends Ticket {
    members: WorkSpaceMembers[]
}

type Editing =
    {
        description?: boolean;
        date?: boolean;
        members?: boolean
    }

const TicketDetailsView: FC<TicketDetailsViewProps> = ({ticketId, ticketData, onClose}) => {
    const [ticketDetails, setTicketDetails] = useState<TicketDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Editing | null>(null);
    const { updateTicketApi} = useTicket() //getWorkSpaceMembers
    const [ticket, setTicket] = useState(ticketData);
    const {updateTicket} = useBoardStore();

    const mutateDescription = (value: string, save: boolean) => {
        const updatedTicket = {
            ...ticket,
            description: value,
        }
        setTicket(updatedTicket);
        updateTicket(ticketId, updatedTicket)
        if (save) updateTicketApi(updatedTicket).then(() => setEditing(null))
    }
    const handleChange = (field: keyof Ticket, value: any) => {
        if (ticket) {
            const updatedTicket={
                ...ticket,
                [field]: value,
            };
            setTicket(updatedTicket);
            updateTicketApi(updatedTicket).then((response) => {
                if (response)
                    updateTicket(ticketId,updatedTicket)
            }).catch((err) => console.log(err))
        }
    };

    if (ticket)
        return (
            <Modal open={!!ticketId} onCancel={onClose} maskClose={true}>
                    <div className="p-6 bg-[#091e420f] mx-autoflex flex-col">
                        <div className="mb-4  flex gap-x-1 items-center w-full">
                            <Icon name={'shortingIcon'}/>
                            <EditableInput
                                textStyle={'text-gray700 hover:bg-gray-200 '}
                                initialValue={ticket?.title || 'ok'}
                                placeholder="Title"
                                onSave={(value) => handleChange('title', value)}/>
                        </div>

                        <div className="mb-4">
                            <div className="mb-4  flex gap-x-1 items-center w-full">
                                <Icon name={'shortingIcon'}/>
                                <Typography className={'text-gray700'} tag={'h4'} variant={{
                                    web: 'Title-18-Regular',
                                    mobile: 'Body-16-Regular'
                                }}>Description</Typography>
                            </div>
                            {editing?.description ? (
                                <DescriptionEditor
                                    value={ticket?.description || ''}
                                    initialValue={ticketData?.description || ''}
                                    onChange={(value) => mutateDescription(value, false)}
                                    onSave={(value) => mutateDescription(value, true)}
                                    onCancel={() => {
                                        setEditing(null)
                                        mutateDescription(ticketData?.description ? ticketData.description : '', false)

                                    }}
                                />
                            ) : (
                                <Fragment>
                                    {!ticket?.description ? <div onClick={() => setEditing({description: true})}
                                                                 className={'bg-gray200 hover:bg-gray-400 rounded-md mt-1 px-4 py-4 min-h-[70px] flex flex-shrink'}>
                                            Add a more detailed description…
                                        </div> :
                                        <div onClick={() => setEditing({description: true})}>
                                            <DescriptionEditor
                                                viewOnly={true}
                                                value={ticket?.description || ''}

                                            /></div>}
                                </Fragment>
                            )}

                        <div className="my-4">
                            <Typography tag={'p'} variant={{
                                web:'Body-16-Regular',
                                mobile:'Body-16-Regular'
                            }} className={'text-gray700 mb-2'}>
                                Due date
                            </Typography>
                            {editing?.date ? (
                                <DatePicker
                                    selected={ticket?.expiryDate ? new Date(ticket.expiryDate) : undefined}
                                    onChange={(date) => handleChange('expiryDate', date ? date.toISOString() : '')}
                                    placeholder="Select expiry date"
                                    className="border p-2 w-full"
                                />
                            ) : (
                                <div className="border p-2 w-full" onClick={()=> setEditing({ date:true})}>
                                    {ticket?.expiryDate ? new Date(ticket.expiryDate).toLocaleDateString() : 'Set due  date'}
                                </div>
                            )}
                        </div>
                        </div>

                        {/*<div className="mt-6">*/}
                        {/*    <h3 className="text-xl font-semibold mb-2">Edit History</h3>*/}
                        {/*    <div className="space-y-2">*/}
                        {/*        {editHistory?.map((entry, index) => (*/}
                        {/*            <div key={index} className="p-4 border border-gray-300 rounded-md">*/}
                        {/*                <div className="text-sm text-gray-600 mb-1">{entry.date} by {entry.user}</div>*/}
                        {/*                <p>{entry.changes}</p>*/}
                        {/*            </div>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*</div>*/}


                    </div>
            </Modal>
        );

    return <Loader/>
};

export default TicketDetailsView;
