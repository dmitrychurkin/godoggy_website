import { createContext } from 'react';
import { observable, configure, flow, action } from 'mobx';
import { isFormValid } from '../lib/formHelpers';
import api from '../lib/api';
import { AUTH_TOKEN, LOGIN_ROUTE, VALIDATE_AUTH, RESET_PWD_ROUTE, RESET_PWD_EMAIL, ERROR_CODES } from '../constants';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true
});

class AppStore {

    static baseErrorMessage = 'Error occured';

    @observable appState = {
        isAuthenticated: false,
        isTokenExists: false,
        isTokenValidated: false
    };

    @observable appSnackbar = {
        isOpen: false,
        message: '',
        variant: 'error'
    };

    @observable requestState = false;

    constructor(initialState = {}) {
        const isTokenExists = !!localStorage.getItem(AUTH_TOKEN);
        this.updateStore({ ...initialState, isTokenExists });
        api.interceptors.request.use(config => {
            config.baseURL = `${window.location.origin}/api`;
            const token = localStorage.getItem(AUTH_TOKEN);
            if (token) {
                config.headers.common['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, ({ message } = {}) => {
            this.setToast({ message: `${message || AppStore.baseErrorMessage}`, isOpen: true });
        });
        api.interceptors.response.use(response => {
            this.handleAuth(response);
            return response;
        }, error => {
            const { status } = (error && error.response) || {};
            if (ERROR_CODES.includes(status)) {
                this.handleResetAuth();
            }
            return Promise.reject(error);
        });
        if (isTokenExists) {
            this.validateTokenApi();
        }
    }

    handleResetAuth() {
        localStorage.removeItem(AUTH_TOKEN);
        this.updateStore({
            isAuthenticated: false,
            isTokenValidated: false,
            isTokenExists: false
        });
    }

    handleAuth({ headers } = {}) {
        const { authorization } = headers;
        const token = authorization ? authorization.split(' ').slice(-1)[0] : localStorage.getItem(AUTH_TOKEN);
        if (token) {
            localStorage.setItem(AUTH_TOKEN, token);
            this.updateStore({
                isAuthenticated: true,
                isTokenValidated: true,
                isTokenExists: true
            });
        }
    }

    handleResponseError(err, setRequestState, defaultText = '') {
        const { data: { message, status, errors = {} } = {}, statusText } = (err && err.response) || {};
        this.setToast({
            isOpen: true,
            message: `${status || message || statusText || defaultText} ${Object.values(errors).map(errArr => errArr.join(' '))}`,
            variant: status ? 'warning' : 'error'
        });
        if (typeof setRequestState === 'function') {
            setRequestState(false);
        }
    }

    validateTokenApi = flow(function* () {
        try {
            yield api({
                url: VALIDATE_AUTH,
                method: 'head'
            });
        } catch { }
    });

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
            yield api({
                method: 'post',
                url: LOGIN_ROUTE,
                data: {
                    email, password, remember
                }
            });
        } catch (err) {
            this.handleResponseError(err, setRequestState, `${AppStore.baseErrorMessage} while logging in`);
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
            const response = yield api({
                method: 'post',
                url: RESET_PWD_EMAIL,
                data: {
                    email
                }
            });
            successfulResponse = true;
            const { status } = (response && response.data) || {};
            if (status) {
                this.setToast({
                    isOpen: true,
                    message: status,
                    variant: 'success'
                });
            }
        } catch (errResponse) {
            this.handleResponseError(errResponse, setRequestState, `${AppStore.baseErrorMessage} while sending password reset link`);
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
            const response = yield api({
                method: 'post',
                url: RESET_PWD_ROUTE,
                data: {
                    email, password, password_confirmation, token
                }
            });
            const { status } = (response && response.data) || {};
            if (status) {
                this.setToast({
                    isOpen: true,
                    message: status,
                    variant: 'success'
                });
            }
        } catch (errResponse) {
            this.handleResponseError(errResponse, setRequestState, `${AppStore.baseErrorMessage} while resetting password`);
        } finally {
            this.setRequest(false);
        }
    }.bind(this));

    logoutApi = flow(function* () {
        if (!localStorage.getItem(AUTH_TOKEN) || this.requestState) {
            return this.handleResetAuth();
        }
        this.setRequest(true);
        try {
            yield api({
                method: 'post',
                url: '/logout'
            });
            this.handleResetAuth();
        } catch (err) {
            this.handleResponseError(err);
        } finally {
            this.setRequest(false);
        }
    }.bind(this));

    @action.bound
    updateStore(newState = {}) {
        for (const [key, value] of Object.entries(newState)) {
            if (!Object.is(this.appState[key], value)) {
                this.appState[key] = value;
            }
        }
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