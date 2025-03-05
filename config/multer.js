import multer from "multer";

// Store file in memory as a buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
