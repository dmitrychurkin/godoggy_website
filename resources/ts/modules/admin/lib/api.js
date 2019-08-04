import axios from 'axios';
import { isFormValid, resetFormFields } from './formHelpers';
import { AUTH_TOKEN, LOGOUT_LOUTE, LOGIN_ROUTE, RESET_PWD_ROUTE, RESET_PWD_EMAIL, VALIDATE_AUTH, ERROR_CODES } from '../constants';

// export const apiSetup = () => {
// const { common } = axios.defaults.headers;
// common['X-Requested-With'] = 'XMLHttpRequest';
// const token = document.head.querySelector('meta[name="csrf-token"]');
// if (token) {
//     common['X-CSRF-TOKEN'] = token.content;
// } else {
//     console.error('CSRF token not found');
// }
// window.axios = axios;
// };

const api = axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

export { api as default };

export const setInterceptors = setAppState => {
    // Request interceptors
    api.interceptors.request.use(config => {
        config.baseURL = `${window.location.origin}/api`;
        const token = localStorage.getItem(AUTH_TOKEN);
        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, (error = {}) => {
        const { message } = error;
        setAppState(prev => ({
            ...prev,
            message: `${message || 'Error occured'}`,
            isOpen: true
        }));
        return Promise.reject(error);
    });

    // Response interceptors
    api.interceptors.response.use(response => {
        const { headers: { authorization } } = response;
        const token = authorization ? authorization.split(' ').slice(-1)[0] : null;
        if (token) {
            localStorage.setItem(AUTH_TOKEN, token);
        }
        if (token || localStorage.getItem(AUTH_TOKEN)) {
            setAppState(prev => ({
                ...prev,
                isTokenExists: true,
                isTokenValidated: true,
                isAuthenticated: true
            }));
        }
        return response;
    }, (error = {}) => {
        const { status } = error.response || {};
        if (ERROR_CODES.includes(status)) {
            localStorage.removeItem(AUTH_TOKEN);
            setAppState(prev => ({
                ...prev,
                isTokenExists: false,
                isTokenValidated: false,
                isAuthenticated: false
            }));
        }
        return Promise.reject(error);
    });
};

export const login = handleRequest(([{ email, password, remember }]) =>
    api({
        method: 'post',
        url: LOGIN_ROUTE,
        data: {
            email: email.value, password: password.value, remember: remember.value || undefined
        }
    }),
    'Error occured while logging in'
);

export const resetPassword = handleRequest(async ([{ email, password, password_confirmation }], setAppState) => {
    const response = await api({
        method: 'post',
        url: RESET_PWD_ROUTE,
        data: {
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
            token: window.location.pathname.split('/').slice(-1)[0]
        }
    });
    const { status } = (response && response.data) || {};
    if (status) {
        setAppState(prev => ({
            ...prev,
            isOpen: true,
            message: status,
            variant: 'success',
            isAppRequestSent: false
        }));
    }
}, 'Error occured while resetting password');

export const sendPasswordReset = handleRequest(async ([{ email }, setLocalState], setAppState, onSuccess) => {
    const response = await api({
        method: 'post',
        url: RESET_PWD_EMAIL,
        data: {
            email: email.value
        }
    });
    const { status } = (response && response.data) || {};
    if (status) {
        setAppState(prev => ({
            ...prev,
            isOpen: true,
            message: status,
            variant: 'success',
            isAppRequestSent: false
        }));
        setLocalState(
            resetFormFields()
        );
        onSuccess();
    }
}, 'Error occured while sending password reset link');


export const logout = async ([isAppRequestSent, setAppState]) => {
    if (isAppRequestSent) {
        return;
    }
    if (!localStorage.getItem(AUTH_TOKEN)) {
        return setAppState(prev => ({
            ...prev,
            isTokenExists: false,
            isTokenValidated: false,
            isAuthenticated: false
        }));
    }
    setAppState(prev => ({
        ...prev,
        isAppRequestSent: true
    }));
    try {
        await api({
            method: 'post',
            url: LOGOUT_LOUTE
        });
        localStorage.removeItem(AUTH_TOKEN);
        setAppState(prev => ({
            ...prev,
            isTokenExists: false,
            isTokenValidated: false,
            isAuthenticated: false,
            isAppRequestSent: false
        }));
    } catch (err) {
        handleApiError(err, setAppState, 'Error occured while logout');
    }
};

export const validateToken = async isTokenExists => {
    if (isTokenExists) {
        try {
            await api({
                url: VALIDATE_AUTH,
                method: 'head'
            });
        } catch { }
    }
}

function handleRequest(apiCallback, defaultErrorMessage) {
    return async (
        e,
        [isAppRequestSent, setAppState],
        [form, setLocalState],
        onSuccess
    ) => {
        if (!isFormValid(e) || form.isRequestSent || isAppRequestSent) {
            return;
        }
        setAppState(prev => ({
            ...prev,
            isAppRequestSent: true
        }));
        setLocalState(prev => ({
            ...prev,
            isRequestSent: true
        }));
        try {
            const response = await apiCallback([form, setLocalState], setAppState, onSuccess);
            if (response) {
                setAppState(prev => ({
                    ...prev,
                    isAppRequestSent: false
                }));
            }
        } catch (err) {
            console.dir(err);

            handleApiError(err, setAppState, defaultErrorMessage);
            setLocalState(prev => ({
                ...prev,
                isRequestSent: false
            }));
        }
    };
};

function handleApiError(err, setAppState, defaultErrorMessage) {
    const { data: { message, status, errors = {} } = {}, statusText } = (err && err.response) || {};
    setAppState(prev => ({
        ...prev,
        isOpen: true,
        message: `${status || message || statusText || defaultErrorMessage} ${Object.values(errors).map(errArr => errArr.join(' '))}`,
        variant: status ? 'warning' : 'error',
        isAppRequestSent: false
    }));
};