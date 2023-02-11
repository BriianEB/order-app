import classes from './Modal.module.css';

import { Fragment } from 'react';
import ReactDOM from 'react-dom';

const portal_element = document.getElementById('overlays');


function Backdrop(props) {
    return (
        <div className={classes.backdrop} onClick={props.onClose}></div>
    );
}


function ModalOverlay(props) {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}


function Modal(props) {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portal_element)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portal_element)}
        </Fragment>
    );
}

export default Modal;
