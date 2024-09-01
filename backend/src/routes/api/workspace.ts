//@ts-nocheck
import express, {Request, Response} from 'express';
import auth from '../../middleware/auth';
import Workspace from '../../models/workspace';
import {body} from 'express-validator';
import {validateRequest} from '../../utils/api-utils/validateRequest';
import mongoose from 'mongoose';
import {User} from "../../models/user";

const router = express.Router();

// Create a new workspace
router.post(
    '/',
    auth,
    [
        body('name').trim().notEmpty().withMessage('Workspace name is required.'),
        validateRequest,
    ],
    async (req: Request, res: Response) => {
        const {name} = req.body;
        try {
            // Create a new workspace with the user's ID
            const workspace = new Workspace({
                name,
                users: [req.user!.id], // Add the creator as a user
            });

            // Save the workspace to the database
            await workspace.save();

            // Populate the users field with the specified fields

            // Populate the users field with the specified fields
            const populatedWorkspace = await Workspace.findById(workspace._id).populate('users', 'name email id');

            // Send the populated workspace as the response
            res.status(201).json(populatedWorkspace);
        } catch (err) {
            console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
            res.status(500).send('Server error');
        }
    }
);


// Get all workspaces for the authenticated user, including user details
router.get('/', auth, async (req: Request, res: Response) => {
    try {
        const workspaces = await Workspace.find({users: req.user!.id})
            .populate('users', 'name email id'); // Populate users and include only name and email
        res.json(workspaces);
    } catch (err) {
        console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
        res.status(500).send('Server error');
    }
});

router.put('/add-user/:workspaceId', auth, async (req: Request, res: Response) => {
    const {workspaceId} = req.params;
    const {email} = req.body;
    // Check if workspaceId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
        return res.status(400).json({message: 'Invalid workspace ID'});
    }

    try {
        // Find the user by email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const userId = user._id;

        // Find the workspace by ID
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({message: 'Workspace not found'});
        }

        // Check if the user is already in the workspace
        if (workspace.users.includes(userId)) {
            return res.status(400).json({message: 'User already in workspace'});
        }

        // Add the user to the workspace
        workspace.users.push(userId);
        await workspace.save();

        // Populate the updated workspace with user details
        const updatedWorkspace = await Workspace.findById(workspaceId).populate('users', 'name email id');
        res.status(200).json(updatedWorkspace);
    } catch (err) {
        console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
        res.status(500).send('Server error');
    }
});


// Remove a user from a workspace
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

        // Populate the updated workspace with user details
        const updatedWorkspace = await Workspace.findById(workspaceId).populate('users', 'name email id');
        res.status(200).json(updatedWorkspace);
    } catch (err) {
        console.error('Error:', err instanceof Error ? err.message : 'Unexpected error');
        res.status(500).send('Server error');
    }
});

export {router as workspaceRouter};
