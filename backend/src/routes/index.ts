//? =====================================================  Routes =====================================================

// ===================== Importing necessary modules/files =====================
import express from "express";

import {currentUserRouter} from "./api/current-user";
import {signInRouter} from "./api/signIn";
import {signOutRouter} from "./api/signOut";
import {signUpRouter} from "./api/signUp";
import categoriesRouter from './api/categories';
// ===================== Configuring Express Router =====================
const router = express.Router();

//* ====================  Routes ====================


router.post("/signin", signInRouter);

router.post("/signup", signUpRouter);

router.post("/signout", signOutRouter);

router.get("/currentuser", currentUserRouter);
router.use('/categories', categoriesRouter);
// router.use('/tickets', ticketsRouter);


export default router;
