import React, { useContext, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useEffect } from "react";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = ({ onClick }) => {
  const { items } = useContext(CartContext);
  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);
  const amount = items.reduce((currNum, item) => currNum + item.amount, 0);
  useEffect(() => {
    if (items.length === 0) return;
    setIsButtonHighlighted(true);
    const timer = setTimeout(() => {
      setIsButtonHighlighted(false);
    }, 300);
   return () => clearTimeout(timer);
  }, [items]);
  return (
    <button
      className={`${classes.button} ${isButtonHighlighted ? classes.bump : ""}`}
      onClick={onClick}>
      <CartIcon className={classes.icon} />
      <span>Your Cart</span>
      <span className={classes.badge}>{amount}</span>
    </button>
  );
};

export default HeaderCartButton;
