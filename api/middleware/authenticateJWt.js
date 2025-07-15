import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const secretKey = process.env.JWT_SECRET;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, payload) => {
      if (err) return res.sendStatus(401);
      req.user = payload;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

