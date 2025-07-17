import upload from "./upload.js";

export const uploadWithValidation = (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};
