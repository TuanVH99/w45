const multer = require('multer');
const router = require('express').Router()
const path = require('path')
const fileExtensions = {
    "image/jpeg": ".jpg",
    "mp3": ".mp3",
    "png": ".png"
}

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname), "../static")
    },
    filename: (req, file, cb) => {
        const fileName = file.filename + "-" + Date.now + fileExtensions[file.mimetype];
        req.savedFile = fileName
        cb(null,fileName)
    },
})

const upload = multer({
    storage: diskStorage
})

router.post("/upload",upload.single("file"),(req,res)=>{
    res.json({fileName:req.savedFile})
})

module.exports = router