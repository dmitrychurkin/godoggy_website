
import { createContext } from 'react';
import { decorate, observable } from 'mobx';

class AppStore {
    constructor(initialState) {
        this.initialState = initialState;
    }
}

decorate(AppStore, {
    initialState: observable
});

export default createContext(new AppStore(window.AppState));