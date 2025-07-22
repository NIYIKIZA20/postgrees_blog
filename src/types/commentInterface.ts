export interface CommentInterface {
    id?: number;
    content: string;
    userId: number;
    blogId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// export interface AddCommentInterface extends Omit<CommentInterface, 'createdAt' | 'updatedAt'> {}
// export interface GetCommentsInterface {
//     comments: CommentInterface[];
// }