import { createContext } from 'react';
import { observable, configure, flow, action } from 'mobx';
import { isFormValid } from '../lib/formHelpers';
import api from '../lib/api';
import { AUTH_TOKEN } from '../constants';

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
            //config.headers.post['header1'] = 'value';
            config.baseURL = `${window.location.origin}/api`;
            console.log(config);
            const token = localStorage.getItem(AUTH_TOKEN);
            if (token) {
                config.headers.common['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, ({ message } = {}) => {
            console.log('api.interceptors.request request error => ');
            console.dir(error);
            this.setToast({ message: `${message || AppStore.baseErrorMessage}`, isOpen: true });
        });
        api.interceptors.response.use(response => {
            // Do something with response data
            console.log('api.interceptors.response response => ');
            console.dir(response);
            this.handleAuth(response);
            return response;
        }, (error = {}) => {
            // Do something with response error
            console.log('api.interceptors.response response error => ');
            console.dir(error);
            const { status } = error.response || {};
            if (status == 401) {
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

        /*if (token) {
            localStorage.setItem(AUTH_TOKEN, token);
            if (!this.appState.isAuthenticated) {
                this.updateStore({
                    isAuthenticated: true,
                    isTokenValidated: true,
                    isTokenExists: true
                });
            } else if (!this.appState.isTokenValidated) {
                this.updateStore({
                    isTokenValidated: true
                });
            }
        } else {
            this.handleResetAuth();
        }*/
    }

    handleResponseError(err, setRequestState) {
        /*
            const { data = {} } = (errResponse && errResponse.response) || {};
            const { message, errors = {} } = data;
            this.setToast({ message: `${message || AppStore.baseErrorMessage} ${Object.values(errors).map(errArr => errArr.join(' '))}`, isOpen: true });
            if (typeof setRequestState === 'function') {
                setRequestState(false);
            }
        */
        const { data: { message } = {}, statusText } = err.response || {};
        this.setToast({ message: `${message || statusText || AppStore.baseErrorMessage}`, isOpen: true });
        if (typeof setRequestState === 'function') {
            setRequestState(false);
        }
    }

    validateTokenApi = flow(function* () {
        try {
            yield api({
                url: '/validate'
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
            const response = yield api({
                method: 'post',
                url: '/login',
                data: {
                    email, password, remember
                }
            });
            console.log('response from loginApi => ', response);
            /* const { success = false, user = null } = (response && response.data) || {};
            this.updateStore({
                authenticated: success,
                guest: !success,
                user
            });
            if (!success) {
                setRequestState(false);
                this.setToast({
                    isOpen: true,
                    message: `${AppStore.baseErrorMessage} while logging in`
                });
            } */
        } catch (err) {
            this.handleResponseError(err, setRequestState);
        } finally {
            this.setRequest(false);
        }
    }.bind(this));

    /* sendPasswordResetApi = flow(function* (
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
            response = api({
                method: 'post',
                url: '/reset-password',
                data: {
                    email
                }
            });
            const { status = '', success = false } = (response && response.data) || {};
            successfulResponse = success;
            this.setToast({
                isOpen: true,
                message: status || `${AppStore.baseErrorMessage} while sending password reset link`,
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
            const response = yield api({
                method: 'post',
                url: '/password/reset',
                data: {
                    email, password, password_confirmation, token
                }
            });
            const { status = '', success = false, user = null } = (response && response.data) || {};
            if (!(success && !status)) {
                this.setToast({
                    isOpen: true,
                    message: status || `${AppStore.baseErrorMessage} while resetting password`,
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
    }.bind(this));*/

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
            // this.updateStore({
            //     authenticated: false,
            //     guest: true,
            //     user: null
            // });
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