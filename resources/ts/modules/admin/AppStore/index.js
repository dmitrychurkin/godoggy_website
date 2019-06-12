
import { createContext } from 'react';
import { observable, configure } from 'mobx';

configure({
    enforceActions: 'always'
});

class AppStore {

    @observable initialState;

    constructor(initialState) {
        this.initialState = initialState;
    }
}

export default createContext(new AppStore(window.AppState));