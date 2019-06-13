import React, { useContext } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { observer } from 'mobx-react-lite';
import theme from '../theme';
import AppStore from '../AppStore';

import SigninPage from '../pages/Signin';

const App = () => {
    const { initialState: { authenticated, i18n } } = useContext(AppStore);
    
    return (
        <BrowserRouter basename='admin'>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Redirect to={`${authenticated ? '/dashboard' : '/login'}`}/>
                <Route
                    path='/dashboard'
                    render={() => <div>Admin dashboard</div>}
                />
                <Route
                    path='/login'
                    render={() => <SigninPage i18n={i18n} />}
                />
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default observer(App);