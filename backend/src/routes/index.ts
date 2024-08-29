//? =====================================================  Routes =====================================================

// ===================== Importing necessary modules/files =====================
import express from "express";
import {signInRouter} from "./api/signIn";
import {signOutRouter} from "./api/signOut";
import {signUpRouter} from "./api/signUp";
import {ticketRouter} from "./api/ticket";
import {categoryRouter} from "./api/categories";

// ===================== Configuring Express Router =====================
const router = express.Router();

//* ====================  Routes ====================


router.post("/signin", signInRouter);

router.post("/signup", signUpRouter);

router.post("/signout", signOutRouter);

router.use('/categories', categoryRouter);
router.use('/tickets', ticketRouter);


export default router;
