import React from 'react';
import clsx from "clsx";
import {is} from "unist-util-is";

// Define a function to format the date without any date libraries
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()]; // Get the month name from the array
    const year = date.getFullYear(); // Get the full year
    return `${month} ${year}`; // Return formatted date
};

// Define the ticket interface
interface Ticket {
    expiryDate?: string;
}

// Define the component to display the ticket expiry date with a clock icon
const TicketExpiry: React.FC<{ ticket: Ticket }> = ({ticket}) => {
    const expiryDate = ticket?.expiryDate ? new Date(ticket.expiryDate) : null;
    const formattedDate = expiryDate ? formatDate(ticket.expiryDate as string) : '';
    // Determine if the ticket is expired by comparing the expiry date with the current date
    const isExpired = expiryDate ? expiryDate < new Date() : false;
    return (
        <>
            {expiryDate ? (
                <div className={`${isExpired? 'bg-error400' : 'bg-green-400'} gap-x-1 flex items-center  px-[6px] py-1 rounded-md text-white`}>
                    <svg
                        className="w-3 h-3  "
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm1-15v4h4v2h-4v4h-2v-4H7v-2h4V7h2z"/>
                    </svg>
                    <span className={'text-[12px] '}>{formattedDate}</span>
                </div>
            ) : null}
        </>
    );
};

export default TicketExpiry;
