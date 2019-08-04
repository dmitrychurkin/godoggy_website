import React, { memo, useContext, useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import NoSsr from '@material-ui/core/NoSsr';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
// import { observer } from 'mobx-react-lite';
import theme from '../theme';
// import AppStore from '../AppStore';
import EntranceForm from './EntranceForm';
import DashboardLayout from './DashboardLayout';
import PreloaderLayout from './PreloaderLayout';
import Toast from './Toast';
import { BASE_PATH, DASHBOARD_ROUTE, LOGIN_ROUTE, RESET_PWD_ROUTE, AUTH_TOKEN } from '../constants';
import { logout, setInterceptors, validateToken } from '../lib/api';

const App = ({ initialState: { i18n } }) => {

    const [appState, setAppState] = useState({
        isTokenExists: !!localStorage.getItem(AUTH_TOKEN),
        isTokenValidated: false,
        isAuthenticated: false,
        isOpen: false,
        message: '',
        variant: 'error',
        isAppRequestSent: false
    });
    const {
        isTokenExists, isTokenValidated, isAuthenticated,
        isOpen, message, variant, isAppRequestSent
    } = appState;

    const { location: { pathname } } = window;
    const isOnlyBasePath = [`${BASE_PATH}/`, BASE_PATH].includes(pathname);
    const hasTrailingSlash = pathname.slice(-1)[0] === '/';
    const normalizedPath = pathname.split(BASE_PATH).slice(-1)[0];
    const canShowDashboard = (isAuthenticated && isTokenExists && isTokenValidated);

    const closeSnackbar = useCallback(() => {
        setAppState(prev => ({ ...prev, isOpen: false }));
    }, []);
    const logoutCb = useCallback(() => {
        logout([isAppRequestSent, setAppState]);
    }, [isAppRequestSent]);

    useEffect(() => {
        setInterceptors(setAppState);
        validateToken(isTokenExists);
    }, []);

    return (
        <>
            <CssBaseline />
            <Box
                width={1}
                component="div"
                position="fixed"
                display={isAppRequestSent ? 'block' : 'none'}
                zIndex="tooltip"
            >
                <LinearProgress />
            </Box>
            <BrowserRouter basename={BASE_PATH.slice(1)}>
                <NoSsr defer>
                    <ThemeProvider theme={theme}>
                        <Switch>
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
                            <Redirect
                                exact
                                from='/'
                                to={canShowDashboard ? DASHBOARD_ROUTE : LOGIN_ROUTE}
                            />
                            <Route
                                exact
                                path={[LOGIN_ROUTE, `${RESET_PWD_ROUTE}/:password_reset?`]}
                                render={({ location: { state } }) => (
                                    <>
                                        {canShowDashboard && <Redirect to={(state && state.referrer) || DASHBOARD_ROUTE} />}
                                        <EntranceForm
                                            i18n={i18n}
                                            isAppRequestSent={isAppRequestSent}
                                            setAppState={setAppState}
                                        />
                                    </>
                                )}
                            />
                            <Route
                                exact
                                path={DASHBOARD_ROUTE}
                                render={({ location }) => (
                                    <>
                                        {!canShowDashboard && (
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
                                            logout={logoutCb}
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
                isOpen={isOpen}
                onClose={closeSnackbar}
                variant={variant}
                message={message}
            />
        </>
    );
};

App.defaultProps = {
    initialState: {}
};

export default memo(App, () => true);//observer(App);