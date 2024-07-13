//? =====================================================  Routes =====================================================

// ===================== Importing necessary modules/files =====================
import express from "express";

import { currentUserRouter } from "./api/current-user";
import { signInRouter } from "./api/signIn";
import { signOutRouter } from "./api/signOut";
import { signUpRouter } from "./api/signUp";

// ===================== Configuring Express Router =====================
const router = express.Router();

//* ====================  Routes ====================


router.post("/signin", signInRouter);

router.post("/signup", signUpRouter);

router.post("/signout", signOutRouter);

router.get("/currentuser", currentUserRouter);

export default router;
