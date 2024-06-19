import classes from "./CartItem.module.css";

const CartItem = ({ amount, price, name  , onAdd , onRemove}) => {
  return (
    <div className={classes.card}>
      <div className={classes.container}>
        <div>
          <h3>{name}</h3>
          <div className={classes.quantity}>
            <span className={classes.price}>${price}</span>
            <span className={classes.amount}>x{amount}</span>
          </div>
        </div>
        <div className={classes.buttons}>
          <button onClick={onRemove}>-</button>
          <button onClick={onAdd}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
