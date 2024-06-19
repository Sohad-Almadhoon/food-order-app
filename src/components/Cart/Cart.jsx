import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ onClose }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { items, totalAmount, addItem, removeItem, clearCart } =
    useContext(CartContext);
  const handleAdd = (item) => {
    addItem({ ...item, amount: 1 });
  };
  const handleRemove = (id) => {
    removeItem(id);
  };
  const checkoutHandler = () => {
    setIsCheckingOut(true);
  };
  const confirmHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: items,
      }),
    });
    setIsSubmitting(false);
    setSuccess(true);
    clearCart();
  };
  return (
    <Modal>
      {success ? (
        <>
          <p>Order sent successfully!</p>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={onClose}>
              Close
            </button>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className={classes["cart-items"]}>
            {items.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onAdd={handleAdd.bind(null, item)}
                onRemove={handleRemove.bind(null, item.id)}
              />
            ))}
          </div>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          {isCheckingOut && (
            <Checkout onClose={onClose} onConfirm={confirmHandler} />
          )}
          {!isCheckingOut && (
            <div className={classes.actions}>
              <button className={classes["button--alt"]} onClick={onClose}>
                Close
              </button>
              {items.length ? (
                <button className={classes.button} onClick={checkoutHandler}>
                  {isSubmitting ? "Submitting..." : "Order"}
                </button>
              ) : null}
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default Cart;
