import React, { memo, createContext, useReducer, useContext, useEffect } from 'react';
import initialState from './state';
import rootReducer from './reducers';

const DispatchContext = createContext(null);
const StoreContext = createContext(null);

const StoreProviderMemoized = memo(({ state, dispatch, children }) => (
  <DispatchContext.Provider value={dispatch}>
    <StoreContext.Provider value={state}>
      {children}
    </StoreContext.Provider>
  </DispatchContext.Provider>
), (prevProps, nextProps) => JSON.stringify(prevProps.state) === JSON.stringify(nextProps.state));

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    // console.log({ newState: state });
  }, [state]);

  return (
    <StoreProviderMemoized
      state={state}
      dispatch={dispatch}
    >
      {children}
    </StoreProviderMemoized>
  );
};


const useDispatch = () => useContext(DispatchContext);
const useStore = () => useContext(StoreContext);

export {
  StoreProvider as default,
  useDispatch,
  useStore
};