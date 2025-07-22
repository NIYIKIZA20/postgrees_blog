// use posgress database

export interface LikeInterface {
    id?: number;
    userId: number;
    blogId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// export interface AddLikeInterface extends Omit<LikeInterface, 'createdAt' | 'updatedAt'> {}
// export interface GetLikesInterface {
//     likes: LikeInterface[];
// }