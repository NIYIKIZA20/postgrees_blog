import { Router } from "express";
import { getAllComments, getComment, createComment, updateComment, deleteComment } from "../controllers/commentController";
import { authMiddleware } from "../middleware/authMiddleware";

const commentRouter = Router();

commentRouter.get('/comments', getAllComments);
commentRouter.get('/comments/:id', getComment);
commentRouter.post('/comments', authMiddleware, createComment);
commentRouter.put('/comments/:id', authMiddleware, updateComment);
commentRouter.delete('/comments/:id', authMiddleware, deleteComment);

export { commentRouter };