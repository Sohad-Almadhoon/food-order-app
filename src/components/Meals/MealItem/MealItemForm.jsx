import { useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = ({ id , addToCart}) => {
  const amountRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredAmount = +amountRef.current.value;
    addToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;
