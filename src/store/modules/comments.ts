import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators';
import store from '@/store';
import { CommentsResponse, Comment } from '../models';
import * as api from '../api';

@Module({
    namespaced: true,
    name: 'comments',
    store,
    dynamic: true,
})
class CommentModule extends VuexModule {
    private comments?: Comment[] | null = null;

    @Mutation
    public setComments(response: CommentsResponse) {
        this.comments = response.comments;
    }

    @Mutation
    public add(response: any) {
        if (!this.comments) {
            this.comments = [];
        }
        this.comments.unshift(response.comment);
    }

    @Mutation
    public delete(response: Comment) {
        if (this.comments) {
            this.comments.splice(this.comments.findIndex((c: Comment) => c.id === response.id), 1);
        }
    }

    get commentList() {
        return this.comments || null;
    }

    @Action({ commit: 'setComments' })
    public async fetchCommentList(slug: string) {
        return await api.fetchComments(slug);
    }

    @Action({ commit: 'add' })
    public async addComment(request: any) {
        return await api.addComment(request.slug, request.comment);
    }

    @Action({ commit: 'delete' })
    public async deleteComment(request: any) {
        return await api.deleteComment(request.slug, request.id)
            .then(() => {
                return request;
            });
    }
}

export default getModule(CommentModule);
