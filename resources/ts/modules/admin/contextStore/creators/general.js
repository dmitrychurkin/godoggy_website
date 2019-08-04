import { INIT_APP } from '../types';
export const initApp = (payload = {}) => ({
  type: INIT_APP,
  payload
});