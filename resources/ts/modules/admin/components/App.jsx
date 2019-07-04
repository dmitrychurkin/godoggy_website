import React, { useContext } from 'react';
import { BrowserRouter, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import NoSsr from '@material-ui/core/NoSsr';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import { observer } from 'mobx-react-lite';
import theme from '../theme';
import AppStore from '../AppStore';
import EntranceForm from './EntranceForm';
import DashboardLayout from './DashboardLayout';
import Toast from './Toast';

const App = () => {
    const {
        initialState: { authenticated, i18n, user },
        loginApi,
        sendPasswordResetApi,
        resetPasswordApi,
        logoutApi,
        setToast,
        appSnackbar,
        requestState
    } = useContext(AppStore);
    const BASE_PATH = '/admin';
    const { location: { pathname }, history } = window;
    let normalizedUrl = '';
    const isOnlyBasePath = [`${BASE_PATH}/`, BASE_PATH].includes(pathname);
    if (isOnlyBasePath) {
        history.replaceState({}, '', BASE_PATH);
    } else {
        const lastSegment = pathname.split(BASE_PATH).slice(-1)[0];
        const lastSegmentArr = lastSegment.split('/');
        if (!lastSegmentArr.slice(-1)[0]) {
            lastSegmentArr.pop();
        }
        normalizedUrl = lastSegmentArr.join('/');
    }

    return (
        <>
            <CssBaseline />
            <Box
                width={1}
                component="div"
                position="fixed"
                display={requestState ? 'block' : 'none'}
                zIndex="tooltip"
            >
                <LinearProgress />
            </Box>
            <BrowserRouter basename='admin'>
                <NoSsr defer>
                    <ThemeProvider theme={theme}>
                        {!isOnlyBasePath && <Redirect strict from={`${normalizedUrl}/`} to={normalizedUrl} />}
                        <Switch>
                            <Route
                                exact
                                path={['/login', '/reset-password', '/password/reset/:password_reset?']}
                                render={() => (
                                    <>
                                        {authenticated && <Redirect to='/dashboard' />}
                                        <EntranceForm
                                            i18n={i18n}
                                            loginApi={loginApi}
                                            sendPasswordResetApi={sendPasswordResetApi}
                                            resetPasswordApi={resetPasswordApi}
                                        />
                                    </>
                                )}
                            />
                            <Route
                                exact
                                path='/dashboard'
                                render={() => (
                                    <>
                                        {!authenticated && <Redirect to='/login' />}
                                        <DashboardLayout
                                            logoutApi={logoutApi}
                                        />
                                    </>
                                )}
                            />
                            <Route render={() => <h2>This should be 404 route</h2>} />
                        </Switch>
                    </ThemeProvider>
                </NoSsr>
            </BrowserRouter>
            <Toast
                isOpen={appSnackbar.isOpen}
                onClose={() => setToast({ ...appSnackbar, isOpen: false })}
                variant={appSnackbar.variant}
                message={appSnackbar.message}
            />
        </>
    );
};

export default observer(App);