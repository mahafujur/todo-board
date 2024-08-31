import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    user: Schema.Types.ObjectId;
    workspace: Schema.Types.ObjectId;
}

const CategorySchema: Schema<ICategory> = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
});

const Category: Model<ICategory> = mongoose.model('Category', CategorySchema);
export default Category;
