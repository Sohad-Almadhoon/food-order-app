import { useReducer } from "react";
import CartContext from "./cart-context";
import { ADD_CART_ITEM, CLEAR_CART, REMOVE_CART_ITEM } from "./contants";
const CartProvider = ({ children }) => {
  const defaultCartState = {
    items: [],
    totalAmount: 0,
  };
  const cartReducer = (state, action) => {
    switch (action.type) {
      case ADD_CART_ITEM:
        const exisitingItemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );
        const exisitingItem = state.items[exisitingItemIndex];
        let updatedItems = [];
        if (exisitingItem) {
          const updatedItem = {
            ...exisitingItem,
            amount: exisitingItem.amount + action.item.amount,
          };
          updatedItems = [...state.items];
          updatedItems[exisitingItemIndex] = updatedItem;
        } else {
          updatedItems = state.items.concat(action.item);
        }
        return {
          items: updatedItems,
          totalAmount:
            state.totalAmount + action.item.price * action.item.amount,
        };
      case REMOVE_CART_ITEM:
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.id
        );
        const item = state.items[itemIndex];
        let items;
        const totalAmount = state.totalAmount - item.price;
        if (item.amount === 1) {
          items = state.items.filter((item) => item.id !== action.id);
        } else {
          const updatedItem = { ...item, amount: item.amount - 1 };
          items = [...state.items];
          items[itemIndex] = updatedItem;
        }
        return {
          items,
          totalAmount,
        };
      case CLEAR_CART:
           return defaultCartState;
      default:
        return defaultCartState;
    }
  };
  const [cartState, dispatchCartActions] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemCartHandler = (item) => {
    dispatchCartActions({ type: ADD_CART_ITEM, item });
  };
  const removeItemCartHandler = (id) => {
    dispatchCartActions({ type: REMOVE_CART_ITEM, id });
  };
 const clearCartHandler = (id) => {
   dispatchCartActions({ type: CLEAR_CART });
 };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemCartHandler,
    removeItem: removeItemCartHandler,
    clearCart:clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};
export default CartProvider;
