import './App.css';
import React,{  useState } from "react";
import Header from './components/Layout/Header';
import Meals from "./components/Meals/Meals";
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider'; 

function App() {
  const [cartIsShown,setcartIsShown] = useState(false);

const showCarthandler = ()=> {
  setcartIsShown(true);
}

const hideCarthandler = ()=> {
  setcartIsShown(false);
}

  return (
     <CartProvider>
      {cartIsShown &&  <Cart hideCarthandler={hideCarthandler}/>}
    <Header showCarthandler={showCarthandler}/>
    <main>
      <Meals/>
    </main>
    </CartProvider>
  );
}

export default App;
