import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { CommentInterface } from "../types/commentInterface";

export class Comment extends Model<CommentInterface> {
    public id!: number;
    public content!: string;
    public userId!: number;
    public blogId!: number;
}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Comment'
});
