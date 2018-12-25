import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators';
import store from '@/store';
import { Article, ArticlesResponse } from '../models';
import * as api from '../api';

@Module({
    namespaced: true,
    name: 'articles',
    store,
    dynamic: true,
})
class ArticleModule extends VuexModule {
    private articles?: Article[] | null = null;
    private article: Article | null = null;

    @Mutation
    public setArticles(res: ArticlesResponse) {
        this.articles = res.articles;
    }

    @Mutation
    public setArticle(response: any) {
        this.article = response.article;
    }

    @Mutation
    public publish(response: any) {
        if (!this.articles) {
            this.articles = [];
        }
        this.articles.unshift(response);
    }

    @Mutation
    public delete(response: Article) {
        if (this.articles) {
            this.articles.splice(this.articles.indexOf(response), 1);
        }

    }

    // @Mutation
    // public update(article: Article) {
    //     if (this.articles) {
    //         const index = this.articles.findIndex((x: Article) => x.slug === article.slug);
    //         this.articles.splice(index, 1, article);
    //     }
    //     this.article = article;
    // }

    get articleList() {
        return this.articles || null;
    }

    get getArticleBySlug() {
        return this.article;
    }

    @Action({ commit: 'setArticles' })
    public async fetchArticleList(request: any) {
        return await api.fetchArticles(request);
    }

    @Action({ commit: 'publish' })
    public async publishArticle(request: {}) {
        return await api.publishArticle(request);
    }

    @Action({ commit: 'setArticle' })
    public async getArticle(slug: string) {
        return await api.getArticle(slug);
    }

    @Action({ commit: 'setArticle' })
    public async editArticle(article: any) {
        return await api.editArticle(article);
    }

    @Action({ commit: 'delete' })
    public async deleteArticle(article: Article) {
        return await api.deleteArticle(article.slug)
            .then(() => {
                return article;
            });
    }

    @Action({ commit: 'setArticle' })
    public async favoriteArticle(slug: string) {
        return await api.favoriteArticle(slug);
    }

    @Action({ commit: 'setArticle' })
    public async unfavoriteArticle(slug: string) {
        return await api.unfavoriteArticle(slug);
    }

}

export default getModule(ArticleModule);
