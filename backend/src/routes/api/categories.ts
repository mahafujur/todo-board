import express, { Response } from 'express';
import auth from '../../middleware/auth';
import Category from '../../models/category';
import { AuthRequest } from "../../types/auth";

const router = express.Router();

router.post('/', auth, async (req: AuthRequest, res: Response) => {
    const { name } = req.body;
    try {
        // Check if a category with the given name already exists
        const existingCategory = await Category.findOne({ name, user: req.user?.id });

        if (existingCategory) {
            // If category exists, return a message indicating the category already exists
            return res.status(400).json({ message: 'Category already exists' });
        }

        // If category does not exist, create and save the new category
        const category = new Category({ name });
        await category.save();

        res.status(201).json(category); // Return the created category
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(500).send('Server error');
        } else {
            console.error('Unexpected error', err);
            res.status(500).send('Server error');
        }
    }
});

router.get('/', auth, async (req: AuthRequest, res: Response) => {
    try {
        const categories = await Category.find({ user: req.user?.id });
        res.json(categories);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(500).send('Server error');
        } else {
            console.error('Unexpected error', err);
            res.status(500).send('Server error');
        }
    }
});

export default router;
