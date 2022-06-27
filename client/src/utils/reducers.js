import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../utils/actions';

import { useReducer } from 'react';

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of 'xxx', return a new state object
    case UPDATE_PRODUCTS:
      return { ...state, products: [...action.products] };
    case UPDATE_CATEGORIES:
      return { ...state, categories: [...action.categories] };
    case UPDATE_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.currentCategory };
    // if it's none of these, don't update state at all
    default:
      return state;
  }
};

// initialize our global state object & provide ups with the functionality to update it
export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
