import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies.token; // Token kommt aus dem Cookie!

  if (!token) {
    return res.status(401).json({ message: "No Token found!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // prüfen
    req.user = decoded; 
    next(); // wenn i. O. next
  } catch (error) {
    return res.status(401).json({ message: "Token not legal!" });
  }
};
