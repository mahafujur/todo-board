import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITicket extends Document {
    title: string;
    description: string;
    expiryDate: Date;
    category: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    status?: string;
    workspace: Schema.Types.ObjectId;
}

const TicketSchema: Schema<ITicket> = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    expiryDate: { type: Date, required: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
});

const Ticket: Model<ITicket> = mongoose.model('Ticket', TicketSchema);
export default Ticket;
