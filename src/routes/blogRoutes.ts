import { Router } from "express";
import { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog } from "../controllers/blogController";
import { authMiddleware, checkAdmin } from "../middleware/authMiddleware";
import { upload } from "../utils/upload";

const blogRouter = Router();

blogRouter.get('/blogs', getAllBlogs);

blogRouter.get('/blogs/:id', getBlog);

blogRouter.post('/blogs',
    authMiddleware,
    checkAdmin,
    upload.single('image'), createBlog);

blogRouter.put('/blogs/:id',
    authMiddleware,
    checkAdmin, updateBlog);

blogRouter.delete('/blogs/:id',
    authMiddleware,
    checkAdmin, deleteBlog);

export { blogRouter };
