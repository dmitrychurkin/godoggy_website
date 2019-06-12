import React, { useContext } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AppStore from '../AppStore';

const App = observer((...args) => {
    console.log(args);
    const { authenticated } = useContext(AppStore);
    
    return (
        <BrowserRouter basename='admin'>
            <Route 
                exact 
                path='/' 
                render={() => <Redirect to={`${authenticated ? '/dashboard' : '/login'}`} />}
            />
            <Route
                path='/dashboard'
                render={() => <div>Admin dashboard</div>}
            />
            <Route
                path='/login'
                render={() => <div>Login page</div>}
            />
        </BrowserRouter>
    );
});

export default App;