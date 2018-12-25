export interface User {
    email: string;
    token: string;
    username: string;
    bio?: string;
    image?: string;
}

export interface UserSubmit {
    email: string;
    password: string;
}

export interface UserResponse {
    user: User
}

export interface ArticlesResponse {
    articles?: (Article)[];
    articlesCount: number;
}

export interface Article {
    title: string;
    slug: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    tagList?: (string | null)[] | null;
    description: string;
    author: Author;
    favorited: boolean;
    favoritesCount: number;
}
export interface Author {
    username: string;
    bio?: null;
    image: string;
    following: boolean;
}

export interface TagsResponse {
    tags?: (string)[] | null;
}

export interface CommentsResponse {
    comments?: (Comment)[];
}
export interface Comment {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Author;
}


