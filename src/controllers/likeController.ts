import { Request, Response } from "express";
import { ResponseService } from "../utils/response";
import { IRequestUser } from "../middleware/authMiddleware";
import { Like } from "../models/likesModel";

export const likeBlog = async (req: IRequestUser, res: Response) => {
    try {
        const { blogId } = req.body;
        const userId = req.user?._id as number;

        const existingLike = await Like.findOne({ where: { userId, blogId } });

        if (existingLike) {
            await existingLike.destroy();
            return ResponseService<any>({
                data: null,
                status: 200,
                success: true,
                message: "Blog unliked successfully",
                res
            });
        }

        const newLike = await Like.create({
            blogId,
            userId
        });
        ResponseService<any>({
            data: newLike,
            status: 201,
            success: true,
            message: "Blog liked successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error liking blog:', { message, stack });
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
}
