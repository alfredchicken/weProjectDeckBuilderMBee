import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies.token; // Token kommt  aus dem Cookie!

  if (!token) {
    return res.status(401).json({ message: "Kein Token vorhanden!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // prüfen
    req.user = decoded; // z. B. { userId: "...", }
    next(); // wenn i. O. next
  } catch (error) {
    return res.status(401).json({ message: "Token ungültig!" });
  }
};
