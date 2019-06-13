import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { apiSetup } from './lib/api';


window.addEventListener('DOMContentLoaded', () => {
    apiSetup();
    const root = document.getElementById('app');
    if (root) {
        render(<App />, root);
    }
});
