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

    get username() {
        return this.user && this.user.username || null;
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
}

export default getModule(UserModule);
