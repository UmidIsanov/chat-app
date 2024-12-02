const multer = require("multer");
const path = require("path");

// Настройки хранилища
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Папка для сохранения файлов
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Уникальное имя файла
  },
});

// Фильтр для проверки типа файла
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Только изображения разрешены!"), false);
  }
};

const upload = multer({ storage, fileFilter });

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Файл не загружен!" });
  }
  res.status(200).json({
    message: "Файл успешно загружен",
    filePath: `/uploads/${req.file.filename}`,
  });
};

module.exports = {
  upload,
  uploadFile,
};
