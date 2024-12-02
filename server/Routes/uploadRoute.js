const express = require("express");
const { upload, uploadFile } = require("../Controllers/uploadController");

const router = express.Router();

// POST запрос на загрузку файла
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
