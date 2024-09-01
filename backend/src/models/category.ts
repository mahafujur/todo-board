import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    user: Schema.Types.ObjectId;
    workspace: Schema.Types.ObjectId;
}

const CategorySchema: Schema<ICategory> = new mongoose.Schema({
    name: { type: String, required: true },  // Removed unique: true
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
});

// Add a compound unique index to ensure name uniqueness within each workspace
CategorySchema.index({ name: 1, workspace: 1 }, { unique: true });

const Category: Model<ICategory> = mongoose.model('Category', CategorySchema);
export default Category;
