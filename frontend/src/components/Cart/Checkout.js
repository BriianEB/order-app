import classes from './Checkout.module.css';

import { useRef, useState } from 'react';

// Auxiliares
const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;


function Checkout(props) {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    const nameInput = useRef();
    const streetInput = useRef();
    const postalCodeInput = useRef();
    const cityInput = useRef();

    function confirmHandler(event) {
        event.preventDefault();

        const name = nameInput.current.value;
        const street = streetInput.current.value;
        const postalCode = postalCodeInput.current.value;
        const city = cityInput.current.value;

        const nameIsValid = !isEmpty(name);
        const streetIsValid = !isEmpty(street);
        const cityIsValid = !isEmpty(city);
        const postalCodeIsValid = isFiveChars(postalCode);

        setFormInputsValidity({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            postalCode: postalCodeIsValid
        });

        const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name,
            street,
            postal_code: postalCode,
            city
        });
    }

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
                <label htmlFor="name">Your name</label>
                <input id="name" type="text" ref={nameInput}/>
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
                <label htmlFor="street">Street</label>
                <input id="street" type="text" ref={streetInput}/>
                {!formInputsValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`}>
                <label htmlFor="postal">Postal Code</label>
                <input id="postal" type="text" ref={postalCodeInput}/>
                {!formInputsValidity.postalCode && <p>Please enter a valid psotal code (5 characters long)!</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input id="city" type="text" ref={cityInput}/>
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;
