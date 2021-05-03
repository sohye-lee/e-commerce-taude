import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/');
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}.jpg`);
    },
}); 

const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.array('image', 10), (req, res) => {
    const filePaths = req.files.map(file => file.path);
    let data = [];
    for (var i = 0; i < filePaths.length; i++) {
        data.push(`/${filePaths[i]}`);
    }
    res.send(data);
});

export default uploadRouter