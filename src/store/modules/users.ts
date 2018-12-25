import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators';
import store from '@/store';
import { User, Author, UserSubmit, UserResponse } from '../models';
import * as api from '../api';

@Module({
    namespaced: true,
    name: 'users',
    store,
    dynamic: true,
})
class UserModule extends VuexModule {
    private user: User | null = null;
    private profile: Author | null = null;

    @Mutation
    public setUser(response: UserResponse) {
        localStorage.setItem('token', response.user.token);
        this.user = response.user;
    }

    @Mutation
    public setProfile(response: any) {
        this.profile = response.profile;
    }

    get username() {
        return this.user && this.user.username || null;
    }

    get userimage() {
        return this.profile && this.profile.image;
    }

    get isUserLoggedIn() {
        return this.user;
    }

    @Action({ commit: 'setUser' })
    public async login(userSubmit: UserSubmit) {
        return await api.loginUser(userSubmit);
    }

    @Action({ commit: 'setUser' })
    public async register(userSubmit: UserSubmit) {
        return await api.registerUser(userSubmit);
    }

    @Action({ commit: 'setProfile' })
    public async getProfile(username: string) {
        return await api.getProfile(username);
    }
}

export default getModule(UserModule);
