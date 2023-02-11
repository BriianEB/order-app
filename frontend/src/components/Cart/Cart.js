import classes from './Cart.module.css';

import axios from 'axios';
import React, { useContext, useState } from 'react';

import CartItem from './CartItem';
import Checkout from './Checkout';
import Modal from '../UI/Modal';

import CartContext from '../../store/cart-context';

const API_URL = 'http://localhost:5000/';


function Cart(props) {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    function cartItemRemoveHandler(id) {
        cartCtx.removeItem(id);
    }

    function cartItemAddHandler(item) {
        cartCtx.addItem({...item, amount: 1});
    }

    function orderHandler() {
        setIsCheckout(true);
    }

    async function submitOrderHandler(userData) {
        setIsSubmitting(true);

        var url = API_URL + 'orders';
        var data = userData;
        data.meals = cartCtx.items.map((meal) => meal.id);
        
        var response = await axios.post(url, data);

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();

    }

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && (
                <React.Fragment>
                    <ul className={classes['cart-items']}>
                        {cartCtx.items.map(function (item) {
                            return (
                                <CartItem
                                    key={item.id}
                                    name={item.name}
                                    amount={item.amount}
                                    price={item.price}
                                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                                    onAdd={cartItemAddHandler.bind(null, item)}
                                />
                            );
                        })}
                    </ul>
                    <div className={classes.total}>
                        <span>Total Amount</span>
                        <span>{totalAmount}</span>
                    </div>

                    {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}

                    {!isCheckout && (
                        <div className={classes.actions}>
                            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                            {hasItems && (
                                <button className={classes.button} onClick={orderHandler}>
                                    Order
                                </button>
                            )}
                        </div>
                    )}
                </React.Fragment>
            )}

            {isSubmitting && (
                <p>Sending order data</p>
            )}

            {!isSubmitting && didSubmit && (
                <React.Fragment>
                    <p>Successfully sent the order!</p>
                    <div className={classes.actions}>
                        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                    </div>
                </React.Fragment>
            )}
        </Modal>
    );
}

export default Cart;
