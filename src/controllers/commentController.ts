import { Request, Response } from "express";
import { ResponseService } from "../utils/response";
import { IRequestUser } from "../middleware/authMiddleware";
import { Comment } from "../models/commentModel";
import { CommentInterface } from "../types/commentInterface";

export const getAllComments = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.findAll();
        ResponseService<CommentInterface[]>({
            data: comments,
            status: 200,
            success: true,
            message: "Comments retrieved successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error getting all comments:', { message, stack });
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
}

export const getComment = async (req: Request, res: Response) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            return ResponseService({
                data: null,
                status: 404,
                success: false,
                message: "Comment not found",
                res
            });
        }
        ResponseService<CommentInterface>({
            data: comment,
            status: 200,
            success: true,
            message: "Comment retrieved successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error getting comment:', { message, stack });
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
}

export const createComment = async (req: IRequestUser, res: Response) => {
    try {
        const { content, blogId } = req.body;
        const userId = req.user?._id as number;
        const newComment = await Comment.create({
            content,
            blogId,
            userId
        });
        ResponseService<CommentInterface>({
            data: newComment,
            status: 201,
            success: true,
            message: "Comment created successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error creating comment:', { message, stack });
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
}

export const updateComment = async (req: Request, res: Response) => {
    try {
        const [updated] = await Comment.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return ResponseService({
                data: null,
                status: 404,
                success: false,
                message: "Comment not found",
                res
            });
        }
        const updatedComment = await Comment.findByPk(req.params.id);
        ResponseService({
            data: updatedComment,
            status: 200,
            success: true,
            message: "Comment updated successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error updating comment:', { message, stack });
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const deleted = await Comment.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return ResponseService({
                data: null,
                status: 404,
                success: false,
                message: "Comment not found",
                res
            });
        }
        ResponseService<any>({
            data: null,
            status: 200,
            success: true,
            message: "Comment deleted successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error deleting comment:', { message, stack });
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
}