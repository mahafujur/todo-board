//@ts-nocheck
import express, {Request, Response } from 'express';
import auth from '../../middleware/auth';
import Category from '../../models/category';
import mongoose from "mongoose";

const router = express.Router();

// Create a new category
router.post('/', auth, async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const existingCategory = await Category.findOne({ name, user: req.user!.id });

        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = new Category({ name, user: req.user!.id });
        await category.save();

        res.status(201).json(category);
    } catch (err) {
        console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
        res.status(500).send('Server error');
    }
});

// Get all categories for the authenticated user
router.get('/', auth, async (req: Request, res: Response) => {
    try {
        const categories = await Category.find({ user: req.user!.id });
        res.json(categories);
    } catch (err) {
        console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
        res.status(500).send('Server error');
    }
});

// Update category name
router.put('/:id', auth, async (req: Request, res: Response) => {
    const { id } = req.params; // Get the category ID from the route parameter
    const { name } = req.body; // Get the new name from the request body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid category ID' }); // Validate category ID
    }

    try {
        // Find the category by ID and the user ID to ensure the category belongs to the authenticated user
        const category = await Category.findOne({ _id: id, user: req.user!.id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' }); // If category is not found, return a 404
        }

        category.name = name; // Update the category's name
        await category.save(); // Save the updated category

        res.json(category); // Return the updated category
    } catch (err) {
        console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
        res.status(500).send('Server error');
    }
});

export { router as categoryRouter };
