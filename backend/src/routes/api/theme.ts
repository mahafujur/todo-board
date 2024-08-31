//@ts-nocheck
import express, {Request, Response} from 'express';
import auth from '../../middleware/auth';
import Category from '../../models/category';
import Ticket from '../../models/ticket';
import Workspace from '../../models/workspace';
import {body} from 'express-validator';
import {validateRequest} from '../../utils/api-utils/validateRequest';
import mongoose from 'mongoose';

const router = express.Router();

// Hardcoded list of themes
const themes = [
    {
        themeId: 'blank',
        name: 'BB',
        title: 'Blank Board',
        categories: ['Todo',],
        tickets: [],
    },
    {
        themeId: 'theme1',
        name: 'SB',
        title: 'Starter Board',
        categories: ['Todo', 'Done', 'In Progress'],
        tickets: ['Title1', 'Title2', 'Title3'],
    },
    {
        themeId: 'theme2',
        name: 'PB',
        title: 'Professional Board',
        categories: ['Backlog', 'In Review', 'Completed', 'Blocked'],
        tickets: ['Task A', 'Task B', 'Task C', 'Task D'],
    },
];

// Route to get all themes
router.get('/', auth, async (req: Request, res: Response) => {
    try {
        res.json(themes);
    } catch (err) {
        console.error('Error fetching themes:', err instanceof Error ? err.message : 'Unexpected error');
        res.status(500).send('Server error');
    }
});

// Route to create categories and tickets based on a selected theme
router.post(
    '/',
    auth,
    [
        body('themeId').trim().notEmpty().withMessage('Theme ID is required.'),
        body('workspaceId').trim().notEmpty().withMessage('Workspace ID is required.'),
        validateRequest,
    ],
    async (req: Request, res: Response) => {
        const {themeId, workspaceId} = req.body;

        // Validate workspaceId
        if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
            return res.status(400).json({message: 'Invalid workspace ID'});
        }

        try {
            // Check if the workspace exists
            const workspace = await Workspace.findById(workspaceId);
            if (!workspace) {
                return res.status(404).json({message: 'Workspace not found'});
            }

            // Find the theme from the hardcoded list
            const themeData = themes.find(theme => theme.themeId === themeId);
            if (!themeData) {
                return res.status(400).json({message: 'Invalid theme ID provided'});
            }

            // Create categories and tickets based on the theme
            const categoryIds = [];
            for (const categoryName of themeData.categories) {
                const category = new Category({
                    name: categoryName,
                    user: req.user!.id,
                    workspace: workspaceId
                });
                await category.save();
                categoryIds.push(category._id);

                // Create sample tickets for each category
                for (const ticketTitle of themeData.tickets) {
                    const ticket = new Ticket({
                        title: ticketTitle,
                        description: `Sample ticket for ${categoryName}`,
                        user: req.user!.id,
                        category: category._id,
                        workspace: workspaceId,
                        expiryDate: new Date(),  // Example expiry date
                    });
                    await ticket.save();
                }
            }

            res.status(201).json({message: 'Theme applied successfully'});
        } catch (err) {
            console.error('Error applying theme:', err instanceof Error ? err.message : 'Unexpected error');
            res.status(500).send('Server error');
        }
    }
);

export {router as themeRouter};
