import React, { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const ref = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateAvatar(ref.current.value);
    }

    React.useEffect(() => {
        ref.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm title="Обновить аватар" name="refresh-avatar" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <div className="popup__field">
                <input ref={ref} name="link" type="url" className="popup__input popup__input_type_link popup__input_refresh-avatar" placeholder="Ссылка на аватар" required />
                <span className="link-error popup__error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;

