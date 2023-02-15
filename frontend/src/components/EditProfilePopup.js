import React, { useState } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext, currentUser } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(`${currentUser.name}`);
        setDescription(`${currentUser.about}`);
    }, [currentUser, props.isOpen]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateUser({
            username: name,
            description: description
        });
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <div className="popup__field">
                <input value={name} name="username" type="text" className="popup__input popup__input_type_name" placeholder="Имя" minLength="2" maxLength="40" required onChange={handleNameChange} />
                <span className="username-error popup__error"></span>
            </div>
            <div className="popup__field">
                <input value={description} name="description" type="text" className="popup__input popup__input_type_description" placeholder="Описание" minLength="2" maxLength="200" required onChange={handleDescriptionChange} />
                <span className="description-error popup__error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;

