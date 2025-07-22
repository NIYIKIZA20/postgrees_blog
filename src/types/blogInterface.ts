

export interface BlogInterface {
    id?: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    blog_image_url?: string;
    author: number;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface interfaceAddBlog {
    title: string;
    description: string;
    content: string;
    isPublished: boolean;
}

export interface GetAllBlogs {
    blogs: BlogInterface[];
}