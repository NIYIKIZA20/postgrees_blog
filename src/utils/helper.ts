import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import  bcrypt from 'bcrypt';

config();


// export const generateToken = (payload: object) => {
//     return jwt.sign(payload, secretKey, { expiresIn: '1h' });
// }

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

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}

export const secretKey = process.env.JWT_SECRET || "SecretKey";

export const generateToken = ({_id, email, role}: { _id: string; email: string; role: string }): string => {
    return jwt.sign({ _id, email, role }, secretKey, { expiresIn: '1d' });
}