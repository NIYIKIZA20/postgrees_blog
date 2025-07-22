import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";
import { ResponseService } from "../utils/response";
import { generateToken } from "../utils/helper";
import { UserInterface, UserLogin } from "../types/userInterface";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        ResponseService<UserInterface[]>({
            data: users,
            status: 200,
            success: true,
            message: "Users retrieved successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error getting all users:', { message, stack });
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return ResponseService({
                data: null,
                status: 404,
                success: false,
                message: "User not found",
                res
            });
        }
        ResponseService<UserInterface>({
            data: user,
            status: 200,
            success: true,
            message: "User retrieved successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error getting user:', { message, stack });
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        ResponseService<UserInterface>({
            data: newUser,
            status: 201,
            success: true,
            message: "User created successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error creating user:', { message, stack });
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as UserLogin;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return ResponseService({
                data: null,
                status: 404,
                success: false,
                message: "User not found",
                res
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return ResponseService({
                data: null,
                status: 401,
                success: false,
                message: "Invalid credentials",
                res
            });
        }
        const token = generateToken({ _id: user.id, role: user.role });
        ResponseService<{ token: string }>({
            data: { token },
            status: 200,
            success: true,
            message: "User logged in successfully",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error logging in user:', { message, stack });
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
}