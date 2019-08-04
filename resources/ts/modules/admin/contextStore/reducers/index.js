import initialState from '../state';
import { INIT_APP } from '../types';
import INIT_APP_REDUCER from './general';

const reducerHandlers = {
  [INIT_APP]: INIT_APP_REDUCER
};
const rootReducer = createReducer(initialState, reducerHandlers);

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export default rootReducer;