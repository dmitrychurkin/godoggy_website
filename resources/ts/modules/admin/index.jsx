import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import StoreProvider from './contextStore';

window.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app');
    if (root) {
        render(
            <StoreProvider>
                <App initialState={{ ...window.AppState }} />
            </StoreProvider>,
            root,
            () => window.AppState = null
        );
    }
});
