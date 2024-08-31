import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IWorkspace extends Document {
    name: string;
    users: Schema.Types.ObjectId[]; // Array of user IDs who are part of the workspace
}

const WorkspaceSchema: Schema<IWorkspace> = new mongoose.Schema({
    name: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
});

const Workspace: Model<IWorkspace> = mongoose.model('Workspace', WorkspaceSchema);
export default Workspace;
