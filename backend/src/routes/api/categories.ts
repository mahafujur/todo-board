//@ts-nocheck
import express, { Request, Response } from 'express';
import auth from '../../middleware/auth';
import Category from '../../models/category';
import mongoose from "mongoose";

const router = express.Router();

// Create a new category
router.post('/', auth, async (req: Request, res: Response) => {
    const { name, workspaceId } = req.body;
    try {
        const existingCategory = await Category.findOne({ name, user: req.user!.id, workspace: workspaceId });

        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = new Category({ name, user: req.user!.id, workspace: workspaceId });
        await category.save();

        res.status(201).json(category);
    } catch (err) {
        console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
        res.status(500).send('Server error');
    }
});

// Get all categories for the authenticated user in a workspace
router.get('/', auth, async (req: Request, res: Response) => {
    const { workspaceId } = req.query;
    try {
        const categories = await Category.find({ user: req.user!.id, workspace: workspaceId });
        res.json(categories);
    } catch (err) {
        console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
        res.status(500).send('Server error');
    }
});

// Update category name
router.put('/:id', auth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid category ID' });
    }

    try {
        const category = await Category.findOne({ _id: id, user: req.user!.id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = name;
        await category.save();

        res.json(category);
    } catch (err) {
        console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
        res.status(500).send('Server error');
    }
});

export { router as categoryRouter };
