import multer from "multer";

const Multer = multer({
  storage: multer.memoryStorage(),
});

export default Multer;
