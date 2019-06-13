
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

    loginApi = flow(function *() {
        return window.axios.get('/api/user');
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