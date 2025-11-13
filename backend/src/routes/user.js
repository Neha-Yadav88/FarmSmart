import express from "express";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  // req.user provided by middleware
  res.json({ user: req.user });
});

export default router;
