const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const productController = require("../controller/product.controller");

const uploadsDir = path.join(__dirname, "../uploads"); // Adjust path if needed (e.g., relative to server root)
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // Creates the directory if it doesn't exist
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Use the ensured directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/create", upload.single("image"), productController.createProduct);
router.get("/get", upload.single("image"), productController.getProducts);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.get("/get/:id", productController.getProduct);

module.exports = router;