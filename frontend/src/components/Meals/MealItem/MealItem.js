import classes from './MealItem.module.css';

import { useContext } from 'react';

import MealItemForm from './MealItemForm';

import CartContext from '../../../store/cart-context';


function MealItem(props) {
    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;

    function addToCartHandler(amount) {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: amount
        });
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.descrption}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
    );
}

export default MealItem;
