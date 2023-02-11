import classes from './AvailableMeals.module.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const API_URL = 'http://localhost:5000/';


function AvailableMeals() {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(function () {
        async function get_meals() {
            var url = API_URL + 'meals';
            var response = await axios.get(url);
            var meals = response.data;
            setMeals(meals);
            setIsLoading(false);
        }

        get_meals().catch(function (e) {
            setIsLoading(false);
            setError(e.message);
        });
    }, []);

    if (error) {
        return (
            <section className={classes['meals-error']}>
                <p>Error</p>
            </section>
        );
    }

    if (isLoading) {
        return (
            <section className={classes['meals-loading']}>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {meals.map(function (meal) {
                        return (
                            <MealItem
                                key={meal.id}
                                id={meal.id}
                                name={meal.name}
                                description={meal.descrption}
                                price={meal.price}
                            />
                        );
                    })}
                </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;
