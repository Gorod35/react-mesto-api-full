import React, { useRef } from 'react';
import success from '../images/Success.png'
import fail from '../images/Mistake.png'

function InfoTooltip(props) {

    const closePopup = () => {
        console.log(props)
    }

    const handleOverlayClose = (e) => {
        if (e.target === e.currentTarget && props.isOpen) {
            props.onClose();
        }
    };

    return (
        <div className={`popup ${props.isOpen ? 'popup__opened' : ''}`} onClick={handleOverlayClose}>
            <div className={`popup__content popup__content_info`}>
                <button type="button" className="popup__close-btn" onClick={props.onClose}></button>
                <img alt={props.isSuccess ? 'Картинка успех' : 'Картинка неудача'} src={props.isSuccess ? success : fail}></img>
                <h3 className="popup__title popup__title_info">{props.isSuccess ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так!
Попробуйте ещё раз.`}</h3>
            </div>
        </div>
    )
}

export default InfoTooltip;