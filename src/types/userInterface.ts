
// export enum Gender {
//     Male= "male",
//     Female= "female",
//     Other= "other"
// }

export interface UserInterface {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role: 'user' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserLogin {
    email: string;
    password?: string;
}

export interface AddUserInterface extends Omit<UserInterface, 'createdAt' | 'updatedAt'> {}
