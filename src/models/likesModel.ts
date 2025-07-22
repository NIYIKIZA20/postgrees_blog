import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { LikeInterface } from "../types/likesInterface";

export class Like extends Model<LikeInterface> {
    public id!: number;
    public userId!: number;
    public blogId!: number;
}

Like.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    modelName: 'Like'
});
