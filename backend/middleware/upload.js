import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Datei-Filter: only PNG und WEBP erlauben
const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PNG- and WEBP-data allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
