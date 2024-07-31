import express, { Response } from 'express';
import auth from '../../middleware/auth';
import Ticket from '../../models/ticket';
import Category from '../../models/category';
import { AuthRequest } from "../../types/auth";

const router = express.Router();

// Create a new ticket
router.post('/', auth, async (req: AuthRequest, res: Response) => {
    const { title, description, expiryDate, categoryId } = req.body;
    try {
        // Check if the category exists
        const existingCategory = await Category.findById(categoryId);
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Create and save the new ticket
        const ticket = new Ticket({
            title,
            description,
            expiryDate,
            category: categoryId,
            user: req.user?.id,
        });
        await ticket.save();

        res.status(201).json(ticket); // Return the created ticket
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

// Update an existing ticket
router.put('/:id', auth, async (req: AuthRequest, res: Response) => {
    const { title, description, expiryDate, categoryId } = req.body;
    const { id } = req.params;

    try {
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Check if the ticket belongs to the authenticated user
        if (ticket.user.toString() !== req.user?.id) {
            return res.status(403).json({ message: 'User not authorized to update this ticket' });
        }

        // Update the ticket properties
        if (title) ticket.title = title;
        if (description) ticket.description = description;
        if (expiryDate) ticket.expiryDate = expiryDate;
        if (categoryId) {
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            ticket.category = categoryId;
        }

        await ticket.save();

        res.status(200).json(ticket); // Return the updated ticket
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

// Get all tickets for the authenticated user
router.get('/', auth, async (req: AuthRequest, res: Response) => {
    try {
        const tickets = await Ticket.find({ user: req.user?.id }).populate('category');
        res.json(tickets);
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

export { router as ticketRouter };
