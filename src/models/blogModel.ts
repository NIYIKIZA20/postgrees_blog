import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { BlogInterface } from "../types/blogInterface";
import { Comment } from "./commentModel";
import { Like } from "./likesModel";

export class Blog extends Model<BlogInterface> {
    public id!: number;
    public title!: string;
    public slug!: string;
    public description!: string;
    public content!: string;
    public blog_image_url!: string;
    public author!: number;
    public isPublished!: boolean;
}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    blog_image_url: {
        type: DataTypes.STRING,
    },
    author: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'Blog'
});

Blog.hasMany(Comment, { foreignKey: 'blogId' });
Blog.hasMany(Like, { foreignKey: 'blogId' });