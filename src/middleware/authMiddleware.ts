import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/helper";
import { User } from "../models/userModel";

export interface IRequestUser extends Request {
    user?: {
        _id: number;
        role: 'user' | 'admin';
    }
}

export const authMiddleware = async (req: IRequestUser, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
        req.user = decoded as { _id: number; role: 'user' | 'admin' };
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
}

export const checkAdmin = async (req: IRequestUser, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Forbidden'
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}