import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITicket extends Document {
    title: string;
    description: string;
    expiryDate: Date;
    category: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    draft?: string;
}

const TicketSchema: Schema<ITicket> = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    draft: { type: String },
});

const Ticket: Model<ITicket> = mongoose.model('Ticket', TicketSchema);
export default Ticket;
