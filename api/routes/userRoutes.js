import express from "express";
import {
    registerUser,
    loginUser,
    getUsersPaginated,
    getUserById,
    searchUserByName
} from "../controllers/userController.js";

const usersRouter = express.Router();

usersRouter.post("/", registerUser);
usersRouter.post("/login", loginUser);

// Middleware para verificar JWT
const secretkey = process.env.JWT_SECRET;
import jwt from "jsonwebtoken";

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

usersRouter.get("/", authenticateJWT, getUsersPaginated);
usersRouter.get("/:id", authenticateJWT, getUserById);
usersRouter.get("/search/nombre", authenticateJWT, searchUserByName);

export { usersRouter };
