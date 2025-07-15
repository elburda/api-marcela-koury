import express from "express";
import jwt from "jsonwebtoken";
import {
    registerUser,
    loginUser,
    getUsersPaginated,
    getUserById,
    searchUserByName
} from "../controllers/userController.js";

const router = express.Router();

const secretkey = process.env.JWT_SECRET;

// Middleware para verificar JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, secretkey, (err, payload) => {
        if (err) return res.sendStatus(401);
        req.user = payload;
        next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Rutas
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/", authenticateJWT, getUsersPaginated);
router.get("/:id", authenticateJWT, getUserById);
router.get("/search/nombre", authenticateJWT, searchUserByName);

export default router;
