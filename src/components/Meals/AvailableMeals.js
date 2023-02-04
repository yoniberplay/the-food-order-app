import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoagin, setisLoagin] = useState(true);
  const [httpError,sethttpError] = useState(null);

  useEffect(() => {

    const fetchMeals = async () => {
      const response = await fetch(
        "https://library-920b7-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();

      const loadData = [];

      for (const key in responseData) {
        loadData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadData);
      setisLoagin(false);
    };

    fetchMeals().catch((error) => {
    sethttpError(error.message);
    setisLoagin(false);
    });
    
    
  }, []);

  if (isLoagin) {
    return (
      <section className={classes.Mealsloading}>
        <p>Loagin...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((m) => (
    <MealItem
      key={m.id}
      id={m.id}
      name={m.name}
      price={m.price}
      description={m.description}
    ></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>{mealsList}</Card>
    </section>
  );
};

export default AvailableMeals;
