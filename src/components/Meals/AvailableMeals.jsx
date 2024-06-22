import { useEffect, useState } from "react";
import { DUMMY_MEALS } from "../../db";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
const AvailableMeals = () => {
  // const [meals, setMeals] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     const response = await fetch("");
  //     if (response.ok) {
  //       throw new Error("Something went Wrong!");
  //     }
  //     const meals = await response.json();
  //     const mealsList = [];
  //     meals.map(({ name, description, price }, idx) =>
  //       mealsList.push({ idx, name, description, price })
  //     );
  //     setMeals(mealsList);
  //     setIsLoading(false);
  //   };
  //   fetchMeals().catch((error) => {
  //     setIsLoading(false);
  //     setError(error.message)
  //   });
  // }, []);
  // if (isLoading) return <h1>Loading....</h1>;
  // if (error) return <h1>{error}🧨</h1>;
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {DUMMY_MEALS.map((meal) => (
            <MealItem key={meal.id} {...meal} />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
