import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = ({ name, description, price, id }) => {
  const _price = `$${price.toFixed(2)}`;
  const { addItem } = useContext(CartContext);
  const handleAddToCart = (amount) => {
    addItem({
      id,
      name,
      price,
      amount,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{_price}</div>
      </div>
      <div>
        <MealItemForm id={id} addToCart={handleAddToCart} />
      </div>
    </li>
  );
};

export default MealItem;
