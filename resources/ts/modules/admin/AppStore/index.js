import { createContext } from 'react';
import { observable, configure, flow, action } from 'mobx';
import { isFormValid } from '../lib/formHelpers';
import { getBaseURL } from '../lib/api';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true
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

    handleError(errResponse, setRequestState) {
        const { data = {} } = (errResponse && errResponse.response) || {};
        const { message = 'Error occured', errors = {} } = data;
        this.setToast({ message: `${message} ${Object.values(errors).map(errArr => errArr.join(' '))}`, isOpen: true });
        if (typeof setRequestState === 'function') {
            setRequestState(false);
        }
    }

    loginApi = flow(function* (
        { email, password, remember },
        [requestSent, setRequestState],
        e) {
        if (!isFormValid(e) || requestSent || this.requestState) {
            return;
        }
        this.setRequest(true);
        setRequestState(true);
        try {
            const response = yield window.axios({
                method: 'post',
                baseURL: getBaseURL(),
                url: '/login',
                data: {
                    email, password, remember
                }
            });
            const { success = false, user = null } = (response && response.data) || {};
            this.updateStore({
                authenticated: success,
                guest: !success,
                user
            });

            if (!success) {
                setRequestState(false);
                this.setToast({
                    isOpen: true,
                    message: 'Error occured while logging in'
                });
            }
        } catch (errResponse) {
            this.handleError(errResponse, setRequestState);
        } finally {
            this.setRequest(false);
        }
    }.bind(this));

    sendPasswordResetApi = flow(function* (
        { email },
        [requestSent, setRequestState],
        e) {
        if (!isFormValid(e) || requestSent || this.requestState) {
            return;
        }
        this.setRequest(true);
        setRequestState(true);
        let successfulResponse = false;
        try {
            response = window.axios({
                method: 'post',
                baseURL: getBaseURL(),
                url: '/reset-password',
                data: {
                    email
                }
            });
            const { status = '', success = false } = (response && response.data) || {};
            successfulResponse = success;
            this.setToast({
                isOpen: true,
                message: status || 'Error occured while sending password reset link',
                variant: status ? (success ? 'success' : 'warning') : 'error'
            });
            if (!success) {
                setRequestState(false);
            }
        } catch (errResponse) {
            this.handleError(errResponse, setRequestState);
        } finally {
            this.setRequest(false);
            return successfulResponse;
        }
    }.bind(this));

    resetPasswordApi = flow(function* (
        { email, password, password_confirmation, token },
        [requestSent, setRequestState],
        e) {
        if (!isFormValid(e) || requestSent || this.requestState) {
            return;
        }
        this.setRequest(true);
        setRequestState(true);
        try {
            const response = yield window.axios({
                method: 'post',
                baseURL: getBaseURL(),
                url: '/password/reset',
                data: {
                    email, password, password_confirmation, token
                }
            });
            const { status = '', success = false, user = null } = (response && response.data) || {};
            if (!(success && !status)) {
                this.setToast({
                    isOpen: true,
                    message: status || 'Error occured while resetting password',
                    variant: status ? (success ? 'success' : 'warning') : 'error'
                });
            }
            if (success) {
                this.updateStore({
                    authenticated: success,
                    guest: !success,
                    user
                });
            } else {
                setRequestState(false);
            }
        } catch (errResponse) {
            this.handleError(errResponse, setRequestState);
        } finally {
            this.setRequest(false);
        }
    }.bind(this));

    logoutApi = flow(function* () {
        this.setRequest(true);
        try {
            yield window.axios({
                method: 'post',
                baseURL: getBaseURL(),
                url: '/logout'
            });
            this.updateStore({
                authenticated: false,
                guest: true,
                user: null
            });
        } catch (errResponse) {
            this.handleError(errResponse);
        } finally {
            this.setRequest(false);
        }
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

}

export default createContext(new AppStore(window.AppState));
window.AppState = null;