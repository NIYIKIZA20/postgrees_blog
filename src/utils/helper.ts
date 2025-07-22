import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const secretKey = process.env.JWT_SECRET as string;

export const generateToken = (payload: object) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}

export const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}