import { Router } from "express";
import { getAllUsers, getUser, createUser, login } from "../controllers/userController";
import { authMiddleware, checkAdmin } from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.get('/users', authMiddleware, checkAdmin, getAllUsers);
userRouter.get('/users/:id', authMiddleware, checkAdmin, getUser);
userRouter.post('/users', createUser);
userRouter.post('/login', login);

export { userRouter };