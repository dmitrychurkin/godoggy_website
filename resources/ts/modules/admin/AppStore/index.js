
import { createContext } from 'react';
import { observable, configure, flow, action } from 'mobx';

configure({
    enforceActions: 'always'
});

class AppStore {

    @observable initialState = {};

    @observable toast = {
        isOpen: false,
        message: '',
        variant: 'error'
    };

    constructor(initialState) {
        this.updateStore(initialState);
    }

    loginApi = flow(function* ({ email, password, remember }) {
        return window.axios({
            method: 'post',
            baseURL: `${origin}/admin`,
            url: '/login',
            data: {
                email, password, remember
            }
        });
    });

    sendPasswordResetApi = flow(function* ({ email }) {
        return window.axios({
            method: 'post',
            baseURL: `${origin}/admin`,
            url: '/reset-password',
            data: {
                email
            }
        });
    });

    resetPasswordApi = flow(function* ({ email, password, password_confirmation, token }) {
        return window.axios({
            method: 'post',
            baseURL: `${origin}/admin`,
            url: '/password/reset',
            data: {
                email, password, password_confirmation, token
            }
        });
    });

    @action.bound
    updateStore(initialState = {}) {
        this.initialState = { ...this.initialState, ...initialState };
    }

    @action.bound
    showToast({ isOpen= false, message= '', variant= 'error' }) {
        this.toast = { ...this.toast, isOpen, message, variant };
    }

    // @action.bound
    // authenticate() {
    //     this.initialState.authenticated = true;
    //     this.initialState.guest = false;
    // }

}

export default createContext(new AppStore(window.AppState));