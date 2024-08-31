//@ts-nocheck
import express, {Request, Response} from 'express';
import auth from '../../middleware/auth';
import Workspace from '../../models/workspace';
import {body} from 'express-validator';
import {validateRequest} from '../../utils/api-utils/validateRequest';
import mongoose from "mongoose";

const router = express.Router();


router.post(
    '/',
    auth,
    [
        body('name').trim().notEmpty().withMessage('Workspace name is required.'),
        validateRequest
    ],
    async (req: Request, res: Response) => {
        const {name} = req.body;
        try {
            const workspace = new Workspace({
                name,
                users: [req.user!.id], // Add the creator as a user
            });
            await workspace.save();
            res.status(201).json(workspace);
        } catch (err) {
            console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
            res.status(500).send('Server error');
        }
    }
);


router.get('/', auth, async (req: Request, res: Response) => {
    try {
        const workspaces = await Workspace.find({users: req.user!.id});
        res.json(workspaces);
    } catch (err) {
        console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
        res.status(500).send('Server error');
    }
});


router.put('/add-user/:workspaceId', auth, async (req: Request, res: Response) => {
    const {workspaceId} = req.params;
    const {userId} = req.body;

    if (!mongoose.Types.ObjectId.isValid(workspaceId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({message: 'Invalid workspace or user ID'});
    }

    try {
        const workspace = await Workspace.findById(workspaceId);

        if (!workspace) {
            return res.status(404).json({message: 'Workspace not found'});
        }

        if (workspace.users.includes(userId)) {
            return res.status(400).json({message: 'User already in workspace'});
        }

        workspace.users.push(userId);
        await workspace.save();

        res.status(200).json(workspace);
    } catch (err) {
        console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
        res.status(500).send('Server error');
    }
});
router.put('/remove-user/:workspaceId', auth, async (req: Request, res: Response) => {
    const {workspaceId} = req.params;
    const {userId} = req.body;

    if (!mongoose.Types.ObjectId.isValid(workspaceId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({message: 'Invalid workspace or user ID'});
    }

    try {
        const workspace = await Workspace.findById(workspaceId);

        if (!workspace) {
            return res.status(404).json({message: 'Workspace not found'});
        }

        if (!workspace.users.includes(userId)) {
            return res.status(400).json({message: 'User not in workspace'});
        }

        workspace.users = workspace.users.filter(id => id.toString() !== userId);
        await workspace.save();

        res.status(200).json(workspace);
    } catch (err) {
        console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
        res.status(500).send('Server error');
    }
});

export {router as workspaceRouter};
