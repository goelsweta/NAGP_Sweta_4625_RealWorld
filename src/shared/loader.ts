import { VuexModule, Module, Action, getModule } from 'vuex-module-decorators';

@Module({
    namespaced: true,
    name: 'loader',
})
export class Loader extends VuexModule {

    @Action
    public show() {
        const element = document.getElementById('overlay') as HTMLDivElement;
        element.style.display = 'block';
    }
    @Action
    public hide() {
        const element = document.getElementById('overlay') as HTMLDivElement;
        element.style.display = 'none';
    }
}
