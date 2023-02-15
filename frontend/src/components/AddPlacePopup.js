import React, { useState } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onAddPlace({ name: name, link: link });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    }

    return (
        <PopupWithForm title="Новое место" name="add-card" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <div className="popup__field">
                <input value={name} onChange={handleNameChange} name="name" type="text" className="popup__input popup__input_type_name" placeholder="Название" minLength="2" maxLength="30" required />
                <span className="name-error popup__error"></span>
            </div>
            <div className="popup__field">
                <input value={link} onChange={handleLinkChange} name="link" type="url" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" required />
                <span className="link-error popup__error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;