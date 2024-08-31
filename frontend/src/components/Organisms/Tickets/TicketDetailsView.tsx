import React, {FC, useEffect, useState} from 'react';
import Modal from '@/components/Organisms/Modal';
import ReactMarkdown from 'react-markdown';
import {Button, DatePicker, Input, Select, Typography} from '@/components/Atom';
import {useTicket} from "@/hooks/useTicket.ts";
import {Ticket} from "@/types/ticket.ts";
import {WorkSpaceMembers} from "@/types/user.ts";

interface TicketDetailsViewProps {
    ticketId?: string | null;
    onClose: () => void;
}

interface EditHistory {
    date: string;
    user: string;
    changes: string;
}

interface TicketDetails extends Ticket {
    members: WorkSpaceMembers[]
}

const TicketDetailsView: FC<TicketDetailsViewProps> = ({ticketId, onClose}) => {
    const [ticketDetails, setTicketDetails] = useState<TicketDetails | null>(null);
    const [editHistory, setEditHistory] = useState<EditHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const {getTicketDetails, updateTicket } = useTicket() //getWorkSpaceMembers
    // const [workspaceMembers, setWorkSpaceMembers] = useState<WorkSpaceMembers[]>([])
    //
    // useEffect(() => {
    //     getWorkSpaceMembers('a').then((response) => {
    //             console.log(response)
    //             setWorkSpaceMembers([])
    //         }
    //     ).catch((err) => console.error(err))
    // }, []);
    useEffect(() => {
        if (ticketId) {
            getTicketDetails(ticketId)
                .then((res) => {
                    console.log(res)
                    const {details, history} = res;
                    setTicketDetails(details);
                    setEditHistory(history);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching ticket details or edit history:', error);
                    setLoading(false);
                });
        }
    }, [ticketId]);

    const handleSave = () => {
        if (ticketId && ticketDetails) {
            updateTicket(ticketDetails)
                .then(() => {
                    setEditing(false);
                })
                .catch(error => {
                    console.error('Error updating ticket:', error);
                });
        }
    };

    const handleChange = (field: keyof Ticket, value: any) => {
        if (ticketDetails) {
            setTicketDetails({
                ...ticketDetails,
                [field]: value,
            });
        }
    };

    if (loading) {
        return (
            <Modal open={!!ticketId} onCancel={onClose}>
                <div className="p-4">Loading...</div>
            </Modal>
        );
    }

    return (
        <Modal open={!!ticketId} onCancel={onClose}>
            <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg flex flex-col">
                <div className="mb-4">
                    {editing ? (
                        <Input
                            value={ticketDetails?.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="Title"
                            className="text-2xl font-bold mb-2 w-full"
                        />
                    ) : (
                        <h2 className="text-2xl font-bold mb-2">{ticketDetails?.title}</h2>
                    )}
                </div>

                <div className="mb-4">
                    {editing ? (
                        <ReactMarkdown
                            value={ticketDetails?.description || ''}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Description"
                            className="border p-2 w-full h-32"
                        />
                    ) : (
                        <ReactMarkdown
                            className="border p-2 w-full h-32">{ticketDetails?.description || ''}</ReactMarkdown>
                    )}
                </div>

                <div className="mb-4">
                    {editing ? (
                        <DatePicker
                            selected={ticketDetails?.expiryDate ? new Date(ticketDetails.expiryDate) : null}
                            onChange={(date) => handleChange('expiryDate', date ? date.toISOString() : '')}
                            placeholderText="Select expiry date"
                            className="border p-2 w-full"
                        />
                    ) : (
                        <div className="border p-2 w-full">
                            {ticketDetails?.expiryDate ? new Date(ticketDetails.expiryDate).toLocaleDateString() : 'No expiry date'}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    {editing ? (
                        <div>afd </div>
                        // <Select
                        //     options={workspaceMembers || []}
                        //     onChange={(e) => handleChange('members', Array.from(e.target.selectedOptions, option => option.value))}
                        //     multiple
                        //     className="border p-2 w-full"
                        //  value={}/>


                    ) : (
                        <div className="border p-2 w-full">
                            Members
                            <br/>
                            {ticketDetails?.members?.map(({name}) => <div>
                                <Typography tag={'p'} variant={{
                                    web: 'Body-14-Medium',
                                    mobile: "Body-12-Medium"
                                }}>{name}</Typography>
                            </div>)}
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Edit History</h3>
                    <div className="space-y-2">
                        {editHistory?.map((entry, index) => (
                            <div key={index} className="p-4 border border-gray-300 rounded-md">
                                <div className="text-sm text-gray-600 mb-1">{entry.date} by {entry.user}</div>
                                <p>{entry.changes}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    {editing ? (
                        <>
                            <Button onClick={handleSave} variant="blue" size="medium" type="button">
                                Save
                            </Button>
                            <Button onClick={() => setEditing(false)} variant="pink" size="medium" type="button"
                                    className="ml-2">
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setEditing(true)} variant="blue" size="medium" type="button">
                            Edit
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default TicketDetailsView;
