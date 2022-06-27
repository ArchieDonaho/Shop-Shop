import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';

// create a new context object
const StoreContext = createContext();
// special react component that we wrap our application in so it can make the state data passed as a prop available to all components
// "Consumer" is our means of grabbing & using the data
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  // state- our most up to date version of our global state object
  // dispatch- the method we execute to update our state. It looks for an action object passed as an argument
  const [state, dispatch] = useProductReducer({
    products: [],
    categories: [],
    currentCategory: '',
  });
  console.log(state);
  // value- allows us to pass in more data for state if needed
  //  ...props- handle any other props the user may need
  return <Provider value={[state, dispatch]} {...props} />;
};

// our custom hook to be used by the components that need the data
// when executed, we receive the [state, dispatch] data our StoreProvider manages for us
// this means any component that has access to our StoreProvider component can use any data in our global state container
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
