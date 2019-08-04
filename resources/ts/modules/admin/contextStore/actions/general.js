import { initApp as initAppCreator } from '../creators';

export const initApp = async dispatch => {
  await new Promise(res => setTimeout(res, 2000));
  dispatch(initAppCreator());
};
