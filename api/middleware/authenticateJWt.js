import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretkey = process.env.JWT_SECRET;

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretkey, (err, payload) => {
      if (err) return res.sendStatus(401); // Token inválido
      req.user = payload; // guardamos el payload para usarlo en otros controladores
        next();
    });
    } else {
    res.sendStatus(401); // No hay token
    }
};
