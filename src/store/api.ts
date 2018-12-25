import axios from 'axios';
import {
    UserSubmit, UserResponse, ArticlesResponse,
    TagsResponse, CommentsResponse, Comment, Article, User,
} from './models';

export const conduitApi = axios.create({
    baseURL: 'https://conduit.productionready.io/api/',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
});

export function setJWT(jwt: string) {
    conduitApi.defaults.headers['Authorization'] = `Token ${jwt}`;
}

export function clearJWT() {
    delete conduitApi.defaults.headers['Authorization']
}

export async function loginUser(user: UserSubmit): Promise<UserResponse | undefined> {
    try {
        return (await conduitApi.post('users/login', {
            user,
        }).then((response: any) => {
            setJWT(response.data.user.token);
            return response.data as UserResponse;
        }));
    } catch (e) {
        console.error(e);
    }
}

export async function registerUser(user: UserSubmit): Promise<UserResponse | undefined> {
    try {
        return (await conduitApi.post('users', {
            user,
        })).data as UserResponse;
    } catch (e) {
        console.error(e);
    }
}

export async function getProfile(username: string): Promise<any | undefined> {
    try {
        return (await conduitApi.get('profiles/' + username)).data;
    } catch (e) {
        console.error(e);
    }
}

export async function fetchArticles(articleRequest: any): Promise<ArticlesResponse | undefined> {
    try {
        return (await conduitApi.get('articles', {
            params: articleRequest,
        })).data as ArticlesResponse;
    } catch (e) {
        console.error(e);
    }
}

export async function publishArticle(article: {}): Promise<ArticlesResponse | undefined> {
    try {
        return (await conduitApi.post('articles', {
            article,
        })).data as ArticlesResponse;
    } catch (e) {
        console.error(e);
    }
}

export async function getArticle(slug: string): Promise<ArticlesResponse | undefined> {
    try {
        return (await conduitApi.get('articles/' + slug))
            .data as ArticlesResponse;
    } catch (e) {
        console.error(e);
    }
}

export async function editArticle(article: Article): Promise<ArticlesResponse | undefined> {
    try {
        return (await conduitApi.put('articles/' + article.slug, {
            article
        })).data as ArticlesResponse;
    } catch (e) {
        console.error(e);
    }
}
export async function deleteArticle(slug: string): Promise<ArticlesResponse | undefined> {
    try {
        return (await conduitApi.delete('articles/' + slug))
            .data as ArticlesResponse;
    } catch (e) {
        console.error(e);
    }
}

export async function favoriteArticle(slug: string): Promise<ArticlesResponse | undefined> {
    try {
        return (await conduitApi.post('articles/' + slug + '/favorite', {
        })).data as ArticlesResponse;
    } catch (e) {
        console.error(e);
    }
}
export async function unfavoriteArticle(slug: string): Promise<ArticlesResponse | undefined> {
    try {
        return (await conduitApi.delete('articles/' + slug + '/favorite'))
            .data as ArticlesResponse;
    } catch (e) {
        console.error(e);
    }
}

export async function fetchTagList(): Promise<TagsResponse | undefined> {
    try {
        return (await conduitApi.get('tags', {
        })).data as TagsResponse;
    } catch (e) {
        console.error(e);
    }
}

export async function fetchComments(slug: string): Promise<CommentsResponse | undefined> {
    try {
        return (await conduitApi.get('articles/' + slug + '/comments', {
        })).data as CommentsResponse;
    } catch (e) {
        console.error(e);
    }
}

export async function addComment(slug: string, comment: any): Promise<CommentsResponse | undefined> {
    try {
        return (await conduitApi.post('articles/' + slug + '/comments', {
            comment,
        })).data as CommentsResponse;
    } catch (e) {
        console.error(e);
    }
}

export async function deleteComment(slug: string, id: number): Promise<CommentsResponse | undefined> {
    try {
        return (await conduitApi.delete('articles/' + slug + '/comments/' + id, {
        })).data as CommentsResponse;
    } catch (e) {
        console.error(e);
    }
}
