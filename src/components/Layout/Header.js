import { Fragment } from "react";
import mealsjpg from '../assets/meals.jpg';
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {

  return (
    <Fragment>
      <header className={classes.header}>
        <h2>ReactMeals</h2>
        <HeaderCartButton show={props.showCarthandler}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsjpg} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
