import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

import { useReducer } from 'react';

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of 'xxx', return a new state object
    case UPDATE_PRODUCTS:
      // return the products with the updated product added
      return { ...state, products: [...action.products] };
    case UPDATE_CATEGORIES:
      // return the categories
      return { ...state, categories: [...action.categories] };
    case UPDATE_CURRENT_CATEGORY:
      // return the category selected
      return { ...state, currentCategory: action.currentCategory };
    case ADD_TO_CART:
      // open the cart and add the product
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    case ADD_MULTIPLE_TO_CART:
      // add multiple items to the cart
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    case REMOVE_FROM_CART:
      // return a cart with the product with the matching _id returned
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });
      // return the cart with the removed item, and close the cart if the re are no items left
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };
    case UPDATE_CART_QUANTITY:
      // open the cart & update the quantity of the selected item
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };
    case CLEAR_CART:
      // remove all items and close the cart
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };
    case TOGGLE_CART:
      // reverse the cartOpen property
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    // if it's none of these, don't update state at all
    default:
      return state;
  }
};

// initialize our global state object & provide ups with the functionality to update it
export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
