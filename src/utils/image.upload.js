const multer = require("multer");
//image upload
const path = require("path");
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: "uploads",
    filename: (_req, file, cb) => {
        cb(null, file.fieldname + "_" + file.originalname.split(".")[0] + "_" + Date.now() + path.extname(file.originalname));
    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(_req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|mp3|mp4|mkv)$/)) {
            // upload only png and jpg format
            return cb(new Error("Please upload a png|jpg|JPEG|mp3|mp4|mkv"));
        }
        cb(undefined, true);
    }
});

exports.upload = imageUpload.fields([{ name: "image", maxCount: 1 }]);

// exports.upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 6
//     },
//     fileFilter: fileFilter
// });