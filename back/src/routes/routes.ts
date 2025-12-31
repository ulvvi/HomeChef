import { Router } from 'express'
import { UserController } from '../controllers/UserController';

const router = Router()


//user routes
router.post('/signup', UserController.signup);



export default router;