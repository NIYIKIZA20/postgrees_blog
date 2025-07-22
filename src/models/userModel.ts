import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Blog } from "./blogModel";
import { Comment } from "./commentModel";
import { Like } from "./likesModel";
import { UserInterface } from "../types/userInterface";


export class User extends Model<UserInterface> {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: 'user' | 'admin';
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: false
});

User.hasMany(Blog, { foreignKey: 'author' });
User.hasMany(Comment, { foreignKey: 'userId' });
User.hasMany(Like, { foreignKey: 'userId' });
