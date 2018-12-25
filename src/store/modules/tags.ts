import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators';
import store from '@/store';
import { TagsResponse } from '../models';
import * as api from '../api';

@Module({
    namespaced: true,
    name: 'tags',
    store,
    dynamic: true,
})
class TagModule extends VuexModule {
    private tags?: string[] | null = null;

    @Mutation
    public setTags(response: TagsResponse) {
        this.tags = response.tags;
    }

    get tagList() {
        return this.tags || null;
    }

    @Action({ commit: 'setTags' })
    public async fetchTagList() {
        return await api.fetchTagList();
    }
}

export default getModule(TagModule);
