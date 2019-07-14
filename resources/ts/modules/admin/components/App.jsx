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
import PreloaderLayout from './PreloaderLayout';
import Toast from './Toast';
import { BASE_PATH, DASHBOARD_ROUTE, LOGIN_ROUTE, RESET_PWD_ROUTE } from '../constants';

const App = () => {
    const {
        appState: { isAuthenticated, isTokenValidated, isTokenExists, i18n, user },
        loginApi,
        sendPasswordResetApi,
        resetPasswordApi,
        logoutApi,
        setToast,
        appSnackbar,
        requestState
    } = useContext(AppStore);
    const { location: { pathname } } = window;
    const isOnlyBasePath = [`${BASE_PATH}/`, BASE_PATH].includes(pathname);
    const hasTrailingSlash = pathname.slice(-1)[0] === '/';
    const normalizedPath = pathname.split(BASE_PATH).slice(-1)[0];
    const canShowDashboard = (isAuthenticated && isTokenExists && isTokenValidated);

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
            <BrowserRouter basename={BASE_PATH.slice(1)}>
                <NoSsr defer>
                    <ThemeProvider theme={theme}>
                        <Switch>
                            <Redirect
                                exact
                                from='/'
                                to={canShowDashboard ? DASHBOARD_ROUTE : LOGIN_ROUTE}
                            />
                            {(!isOnlyBasePath && hasTrailingSlash) && (
                                <Redirect
                                    strict
                                    from={`${normalizedPath}`}
                                    to={normalizedPath.slice(0, -1)}
                                />
                            )}
                            {(isTokenExists && !isTokenValidated) && (
                                <Route component={PreloaderLayout} />
                            )}
                            <Route
                                exact
                                path={[LOGIN_ROUTE, `${RESET_PWD_ROUTE}/:password_reset?`]}
                                render={({ location: { state } }) => (
                                    <>
                                        {canShowDashboard && <Redirect to={(state && state.referrer) || DASHBOARD_ROUTE} />}
                                        <EntranceForm
                                            i18n={i18n}
                                            loginApi={loginApi}
                                            sendPasswordResetApi={sendPasswordResetApi}
                                            resetPasswordApi={resetPasswordApi}
                                            isRequestSent={requestState}
                                        />
                                    </>
                                )}
                            />
                            <Route
                                exact
                                path={DASHBOARD_ROUTE}
                                render={({ location }) => (
                                    <>
                                        {(!isAuthenticated || !isTokenExists || !isTokenValidated) && (
                                            <Redirect
                                                to={{
                                                    pathname: LOGIN_ROUTE,
                                                    state: {
                                                        referrer: location.pathname
                                                    }
                                                }}
                                            />
                                        )}
                                        <DashboardLayout
                                            logoutApi={logoutApi}
                                        />
                                    </>
                                )}
                            />
                            <Route render={({ ...rest }) => <h2>{console.log(rest)}This should be 404 route</h2>} />
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