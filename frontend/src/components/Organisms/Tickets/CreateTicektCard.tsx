import React, {FC, useEffect, useRef, useState} from "react";
import {useTicket} from "@/hooks/useTicket.ts";
import {Button} from "@/components/Atom";
import useBoardStore from "@/store/useBoardStore.ts";
import {Ticket} from "@/types/ticket.ts";

interface CreateTicketCardProps {
    id: string;
    onCancel: () => void;
}

const CreateTicketCard: FC<CreateTicketCardProps> = ({id, onCancel}) => {
    const {createATicket} = useTicket();
    const {addTicket} = useBoardStore();
    const [ticketTitle, setTicketTitle] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    const handleSave = () => {
        if (ticketTitle.trim()) {
            createATicket({title: ticketTitle, categoryId: id} as any).then((res) => {
                addTicket({
                    id: res._id,
                    title: res.title,
                    expiryDate: res.expiryDate,
                    description: res.description,
                    category: res.category,

                } as Ticket);
            }).catch((err) => console.error(err)).finally
            (() => {
                setTicketTitle("");
                onCancel();
            });

        } else onCancel()
    };

    return (
        <div className="mt-2">
          <textarea
              ref={textareaRef}
              value={ticketTitle}
              onChange={(e) => setTicketTitle(e.target.value)}
              placeholder="Enter ticket title..."
              className="border border-gray-300 rounded px-2 py-1 mb-2 w-full resize-none"
              rows={2}
              onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSave();
                  }
              }}
          />
            <div className="flex gap-x-2 justify-end items-center">
                <Button onClick={handleSave} variant={"blue"} size={"small"} type={"primary"}>
                    Add Card
                </Button>
                <Button onClick={onCancel} variant={"pink"} size={"small"} type={"text"}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default CreateTicketCard;
