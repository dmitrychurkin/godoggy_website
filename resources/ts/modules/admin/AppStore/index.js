
import { createContext } from 'react';
import { observable, configure, flow, action } from 'mobx';

configure({
    enforceActions: 'always'
});

class AppStore {

    @observable initialState = {};

    constructor(initialState) {
        this.initilizeStore(initialState);
    }

    loginApi = flow(function *({ email, password, rememberMe }) {
        return window.axios({
            method: 'post',
            baseURL: `${origin}/admin`,
            url: '/signin',
            data: {
                email, password, rememberMe
            }
        });
    });

    @action.bound
    initilizeStore(initialState) {
        this.initialState = initialState;
    }

    @action.bound
    authenticate() {
        this.initialState.authenticated = true;
        this.initialState.guest = false;
    }

}

export default createContext(new AppStore(window.AppState));