import React, { useContext } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import NoSsr from '@material-ui/core/NoSsr';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { observer } from 'mobx-react-lite';
import theme from '../theme';
import AppStore from '../AppStore';

import EntranceForm from './EntranceForm';

const App = () => {
    const { initialState: { authenticated, i18n, user }, loginApi, updateStore, sendPasswordResetApi, resetPasswordApi, showToast } = useContext(AppStore);

    return (
        <>
            <CssBaseline />
            <BrowserRouter basename='admin'>
                <NoSsr defer>
                    <ThemeProvider theme={theme}>
                        {
                            !['password/reset'].find(path => window.location.pathname.includes(path)) && <Redirect to={`${authenticated ? '/dashboard' : '/login'}`} />
                        }
                        <Route
                            path={['/login', '/reset-password', '/password/reset/:password_reset?']}
                            render={() => (
                                <EntranceForm
                                    i18n={i18n}
                                    loginApi={loginApi}
                                    updateStore={updateStore}
                                    sendPasswordResetApi={sendPasswordResetApi}
                                    resetPasswordApi={resetPasswordApi}
                                />
                            )}
                        />
                        <Route
                            path='/dashboard'
                            render={() => <div>Admin dashboard -> {JSON.stringify({ user })}</div>}
                        />
                    </ThemeProvider>
                </NoSsr>
            </BrowserRouter>
        </>
    );
};

export default observer(App);