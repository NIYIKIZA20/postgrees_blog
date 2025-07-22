import { Request, Response } from 'express';
import { ResponseService } from "../utils/response";
import { GetAllBlogs, interfaceAddBlog, BlogInterface } from '../types/blogInterface';
import { Blog } from '../models/blogModel';
import { User } from '../models/userModel';
import { Comment } from '../models/commentModel';
import { generateSlug } from '../utils/helper';
import { IRequestUser } from '../middleware/authMiddleware';
import { uploadFile } from '../utils/upload';


interface IRequestBlog extends IRequestUser {
    body: interfaceAddBlog;
}

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.findAll({
            include: [
                { model: User, as: 'author', attributes: ['name'] },
                { 
                    model: Comment, 
                    as: 'comments', 
                    attributes: ['message', 'userId'],
                    include: [{ model: User, as: 'user', attributes: ['name'] }]
                }
            ]
        });

        if (!blogs || blogs.length === 0) {
            return ResponseService({
                data: null,
                status: 404,
                success: false,
                message: "No blogs found",
                res
            });
        }

        ResponseService<GetAllBlogs>({
            data: { blogs },
            status: 200,
            success: true,
            message: "Blogs retrieved successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error getting all blogs:', { message, stack });
        
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
};

export const getBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findByPk(req.params.id);

        if(!blog) {
            return ResponseService({
                data: null,
                status: 404,
                success: false,
                message: "Blog not found",
                res
            });
        }

        ResponseService<BlogInterface>({
            data: blog,
            status: 200,
            success: true,
            message: "Blog retrieved successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error getting blog:', { message, stack });
        
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
};

export const createBlog = async (req: IRequestBlog, res: Response) => {
    try {
        const {file} = req
    
        const _id = req?.user?._id as number
       
        const { title, description, isPublished, content } = req.body;
        
        let blog_image_url = "";
        if (file) {
            blog_image_url = await uploadFile(file as Express.Multer.File);
        }
        const newBlog = await Blog.create({
            title,
            slug: generateSlug(title),
            description,
            isPublished,
            content,
            blog_image_url,
            author: _id,
        })
       
        ResponseService({
            data: newBlog,
            status: 201,
            success: true,
            message: "Blog created successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error creating blog:', { message, stack });
        
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const [updated] = await Blog.update(req.body, { where: { id: req.params.id } });

        if (!updated) {
            return ResponseService({
                data: null,
                status: 404,
                success: false,
                message: "Blog not found",
                res
            });
        }

        const updatedBlog = await Blog.findByPk(req.params.id);

        ResponseService({
            data: updatedBlog,
            status: 200,
            success: true,
            message: "Blog updated successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error updating blog:', { message, stack });
        
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const deleted = await Blog.destroy({ where: { id: req.params.id } });

        if (!deleted) {
            return ResponseService({
                data: null,
                status: 404,
                success: false,
                message: "Blog not found",
                res
            });
        }

        ResponseService<any>({
            data: null,
            status: 200,
            success: true,
            message: "Blog deleted successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error deleting blog:', { message, stack });
        
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
};
