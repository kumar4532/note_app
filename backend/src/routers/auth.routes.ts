import express from 'express'
import { signin, signout, signup } from '../controllers/auth.controller';
import protectRoute from '../middlewares/protectedRoutes';

const router = express.Router();

router.post("/sign-up", signup)
router.post("/sign-in", signin)
router.post("/sign-out", protectRoute, signout)

export default router;