import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { Checkout } from "./Checkout";

const Cart = (props) => {

  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;
  const [isCheckout,setisCheckout] = useState(false);
  const [IsSubmitting,setIsSubmitting] = useState(false);
  const [didSubmit,setdidSubmit] = useState(false);

  const cartItemRemoveHandler = (id)=>{
    cartCtx.removeItem(id);
  }

  const cartItemAddHandler = (item)=>{
    cartCtx.addItem({...item, amount: 1});
  }

  


const orderHandler = ( ) => {
  setisCheckout(true);
}

const modalActions = (
<div className={classes.actions}>
  <button
    className={classes["button--alt"]}
    onClick={props.hideCarthandler}
  >
    Close
  </button>
  {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>);

const submitOrderHandler = async (userData) => {
  setIsSubmitting(true);
 await fetch('https://library-920b7-default-rtdb.firebaseio.com/orders.json',{
  method:'POST',
  body:JSON.stringify({
    user: userData,
    orderedItems: cartCtx.items
  })
 });
 setIsSubmitting(false);
 setdidSubmit(true);
 cartCtx.clearitems();

}
  
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null,item.id)}
          onAdd={cartItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <React.Fragment>
 {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.hideCarthandler} />}
      {!isCheckout && modalActions}
    </React.Fragment>
  );


  const isSubmittingContent = <p>Sending order data...</p>;

  const didSubmitModalContent =
  <React.Fragment>
    <p>Sucessfully sent the order!</p>
    <div className={classes.actions}>
  <button
    className={classes["button--alt"]}
    onClick={props.hideCarthandler}
  >
    Close
  </button>
 </div>
  </React.Fragment>
  

  return (
    <Modal hideCarthandler={props.hideCarthandler}>
      {!IsSubmitting && !didSubmit && cartModalContent}
      {IsSubmitting && isSubmittingContent}
      {!IsSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
