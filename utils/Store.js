import { createContext, useReducer } from "react";
export const Store = createContext();
const initialState = {
  cart: {
    cartItems: [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      let allredyIncart = false;
      const newItem = action.payload;
      const exitItems = state.cart.cartItems.slice();
      exitItems.forEach((element) => {
        if (element.name === newItem.name) {
          allredyIncart = true;
        }
      });
      if (!allredyIncart) {
        exitItems.push(newItem);
      }
      return { ...state, cart: { ...state.cart, cartItems: exitItems } };
    }
    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
