
import { createContext } from 'react';
import { observable, configure, flow, action } from 'mobx';

configure({
    enforceActions: 'always'
});

class AppStore {

    @observable initialState = {};

    @observable appSnackbar = {
        isOpen: false,
        message: '',
        variant: 'error'
    };

    @observable requestState = false;

    constructor(initialState) {
        this.updateStore(initialState);
    }

    loginApi = flow(function* ({ email, password, remember }) {
        this.setRequest(true);
        return window.axios({
            method: 'post',
            baseURL: `${origin}/admin`,
            url: '/login',
            data: {
                email, password, remember
            }
        });
    }.bind(this));

    sendPasswordResetApi = flow(function* ({ email }) {
        this.setRequest(true);
        return window.axios({
            method: 'post',
            baseURL: `${origin}/admin`,
            url: '/reset-password',
            data: {
                email
            }
        });
    }.bind(this));

    resetPasswordApi = flow(function* ({ email, password, password_confirmation, token }) {
        this.setRequest(true);
        return window.axios({
            method: 'post',
            baseURL: `${origin}/admin`,
            url: '/password/reset',
            data: {
                email, password, password_confirmation, token
            }
        });
    }.bind(this));

    @action.bound
    updateStore(initialState = {}) {
        this.initialState = { ...this.initialState, ...initialState };
    }

    @action.bound
    setToast({ isOpen = false, message = '', variant = 'error' } = {}) {
        this.appSnackbar = { isOpen, message, variant };
    }

    @action.bound
    setRequest(state) {
        this.requestState = state;
    }

    // @action.bound
    // authenticate() {
    //     this.initialState.authenticated = true;
    //     this.initialState.guest = false;
    // }

}

export default createContext(new AppStore(window.AppState));