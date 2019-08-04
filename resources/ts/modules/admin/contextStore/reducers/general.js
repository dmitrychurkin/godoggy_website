import initialState from '../state';

export default (state = initialState) => ({
  ...state,
  initApp: true
});