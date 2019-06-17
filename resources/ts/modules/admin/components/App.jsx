import React, { useContext } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import NoSsr from '@material-ui/core/NoSsr';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { observer } from 'mobx-react-lite';
import theme from '../theme';
import AppStore from '../AppStore';

import SigninPage from '../pages/Signin';

const App = () => {
    const { initialState: { authenticated, i18n, user }, loginApi, updateStore } = useContext(AppStore);

    return (
        <>
            <CssBaseline />
            <BrowserRouter basename='admin'>
                <NoSsr defer>
                    <ThemeProvider theme={theme}>
                        <Redirect to={`${authenticated ? '/dashboard' : '/login'}`} />
                        <Route
                            path='/dashboard'
                            render={() => <div>Admin dashboard -> {JSON.stringify({ user })}</div>}
                        />
                        <Route
                            path='/login'
                            render={() => (
                                <SigninPage
                                    i18n={i18n}
                                    loginApi={loginApi}
                                    updateStore={updateStore}
                                />
                            )}
                        />
                    </ThemeProvider>
                </NoSsr>
            </BrowserRouter>
        </>
    );
};

export default observer(App);