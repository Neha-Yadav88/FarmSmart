import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../models/User.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const router = express.Router();

// Multer setup (store uploads in /uploads)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "..", "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${unique}${ext}`);
  },
});
const upload = multer({ storage });

// Register
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const {
      name, email, password, phone, state, district, village,
      farmerType, farmArea, primaryCrop, soilType, preferredLanguage
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered." });

    const hashed = await bcrypt.hash(password, 10);

    const userData = {
      name, email, password: hashed, phone, state, district, village,
      farmerType, farmArea, primaryCrop, soilType, preferredLanguage
    };

    if (req.file) {
      userData.profileImage = `/uploads/${req.file.filename}`; // serve static later
    }

    const user = await User.create(userData);

    return res.status(201).json({ message: "Registered successfully", user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "supersecretkey", { expiresIn: "7d" });

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage || null
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
