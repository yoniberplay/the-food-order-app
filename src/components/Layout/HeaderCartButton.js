import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import cartContext from "../../store/cart-context";
import React, { useContext } from "react";


const HeaderCartButton = (props) => {
  
  const [btnIsHighlighted,setbtnIsHighlighted] = React.useState(false);
  const cartCtx = useContext(cartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber,item) => {
    return curNumber + item.amount;
  },0);

 

 const btnclasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

 React.useEffect(()=>{
  if(items.length === 0 ){
    return;
  }
  setbtnIsHighlighted(true);

  const timer = setTimeout(()=>{
    setbtnIsHighlighted(false);
  },300);

  return () => {
    clearTimeout(timer);
  }

 },[items]);


  return (
    <button className={btnclasses} onClick={props.show}>
      <span className={classes.icon}>
        <CartIcon/>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
