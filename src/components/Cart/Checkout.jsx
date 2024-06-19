import { useRef } from "react";
import classes from "./Checkout.module.css";
import { useState } from "react";

const Checkout = ({ onClose, onConfirm }) => {
  const [formInputsValidty, setFormInputsValidty] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();
  const isEmpty = (value) => value.trim() === "";
  const isFiveChars = (value) => value.trim().length === 5;
  const confirmHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;
    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const cityIsValid = !isEmpty(city);
    const postalIsValid = isFiveChars(postal);
    const isValidForm =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid;
    setFormInputsValidty({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalIsValid,
    });
    if (!isValidForm) return;
    onConfirm({
      name,
      city,
      street,
      postal,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputsValidty.name ? "" : classes.invalid
        }`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formInputsValidty.name && <p>Please enter a valid name </p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidty.street ? "" : classes.invalid
        }`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formInputsValidty.street && <p>Please enter a valid street </p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidty.postalCode ? "" : classes.invalid
        }`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!formInputsValidty.postalCode && (
          <p>Please enter a valid postal code </p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidty.city ? "" : classes.invalid
        }`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formInputsValidty.city && <p>Please enter a valid city </p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
