
import { createContext } from 'react';
import { observable, configure, flow, action } from 'mobx';

configure({
    enforceActions: 'always'
});

class AppStore {

    @observable initialState = {};

    constructor(initialState) {
        this.updateStore(initialState);
    }

    loginApi = flow(function* ({ email, password, remember }) {
        return window.axios({
            method: 'post',
            baseURL: `${origin}/admin`,
            url: '/signin',
            data: {
                email, password, remember
            }
        });
    });

    @action.bound
    updateStore(initialState = {}) {
        this.initialState = { ...this.initialState, ...initialState };
    }

    // @action.bound
    // authenticate() {
    //     this.initialState.authenticated = true;
    //     this.initialState.guest = false;
    // }

}

export default createContext(new AppStore(window.AppState));