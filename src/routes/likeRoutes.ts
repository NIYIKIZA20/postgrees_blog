import { Router } from "express";
import { likeBlog } from "../controllers/likeController";
import { authMiddleware } from "../middleware/authMiddleware";

const likeRouter = Router();

likeRouter.post('/likes', authMiddleware, likeBlog);

export { likeRouter };