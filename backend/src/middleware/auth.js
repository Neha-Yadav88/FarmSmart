import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.cookies?.token;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    if (!token) return res.status(401).json({ message: "Invalid token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
