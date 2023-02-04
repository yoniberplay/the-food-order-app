import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {

  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = state.items.findIndex(
      (i) => i.id === action.item.id
    );

    const existinCartItem = state.items[existingItemIndex];
    let updateItems;

    if (existinCartItem) {
      const updatedItem = {
        ...existinCartItem,
        amount: existinCartItem.amount + action.item.amount,
      };
      updateItems = [...state.items];
      updateItems[existingItemIndex] = updatedItem;
    } else {
      updateItems = state.items.concat(action.item);
    }

    return {
      items: updateItems,
      totalAmount: updatedTotalAmount,
    };


  }

  if (action.type === 'CLEAR') {
return defaultCartState;
  }

  if (action.type === 'DELETE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };

};
}

const CartProvider = (props) => {
  const [CartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "DELETE",
      id: id,
    });
  };

  const clearCartItemsHandler = (id) => {
    dispatchCartAction({
      type: "CLEAR",
      
    });
  };

  const cart_Context = {
    items: CartState.items,
    totalAmount: CartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearitems: clearCartItemsHandler
  };

  return (
    <CartContext.Provider value={cart_Context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
