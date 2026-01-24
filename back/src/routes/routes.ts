import { Router } from 'express'
import { UserController } from '../controllers/UserController';
import multer from 'multer';
import { photoUpload } from '../config/uploader';

const router = Router()


//user routes
router.post('/signup', UserController.signup);
router.post('/upload-photo', photoUpload.single('photo'), UserController.postImage);


export default router;