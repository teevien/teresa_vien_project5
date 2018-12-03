import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope)
library.add(faPhone)

const Overlay = (props) => {
    return(
        <div class="overlay">
            <p>Mix: {props.mix}</p>
            <p>Age: {props.age}</p>
            <p>Sex: {props.sex}</p>
            <div className="contact">
                <a href={"mailto:" + props.contact}><FontAwesomeIcon icon={faEnvelope} /></a>
                <a href={"tel:" + props.phone}><FontAwesomeIcon icon={faPhone} /></a>
            </div>
        </div>
    )
}

export default Overlay;