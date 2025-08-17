import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: "No Token found!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // prüfen Token
    req.user = decoded; 
    next(); //  middleware brauchen immer ein next(), damit der req weiter geht
  } catch (error) {
    return res.status(401).json({ message: "Token not legal!" });
  }
};
