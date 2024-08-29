//@ts-nocheck
import express, {Request, Response} from 'express';
import auth from '../../middleware/auth';
import Ticket from '../../models/ticket';
import Category from '../../models/category';

const router = express.Router();

router.post('/', auth, async (req: Request, res: Response) => {
    const {title, description, expiryDate, categoryId} = req.body;
    try {
        const existingCategory = await Category.findById(categoryId);
        if (!existingCategory) {
            return res.status(404).json({message: 'Category not found'});
        }

        const ticket = new Ticket({
            title,
            description,
            expiryDate,
            category: categoryId,
            user: req.user?.id as string, // Ensure req.user?.id is correctly typed
        });
        await ticket.save();

        res.status(201).json(ticket);
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

router.put('/:id', auth, async (req: Request, res: Response) => {
    const {title, description, expiryDate, categoryId} = req.body;
    const {id} = req.params;

    try {
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return res.status(404).json({message: 'Ticket not found'});
        }

        if (ticket?.user?.toString() !== req.user?.id as string) {
            return res.status(403).json({message: 'User not authorized to update this ticket'});
        }

        if (title) ticket.title = title;
        if (description) ticket.description = description;
        if (expiryDate) ticket.expiryDate = expiryDate;
        if (categoryId) {
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({message: 'Category not found'});
            }
            ticket.category = categoryId;
        }

        await ticket.save();

        res.status(200).json(ticket);
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

router.get('/', auth, async (req: Request, res: Response) => {
    try {
        const tickets = await Ticket.find({user: req.user?.id as string}).populate('category');
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

export {router as ticketRouter};
