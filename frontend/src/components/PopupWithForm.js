import React from 'react';

class PopupWithForm extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    handleOverlayClose = (e) => {
        if (e.target === e.currentTarget && this.props.isOpen) {
            this.props.onClose();
        }
    };

    render() {
        return (
            <div className={`popup popup_${this.props.name} ${this.props.isOpen ? 'popup__opened' : ''}`} onClick={this.handleOverlayClose}>
                <div className={`popup__content popup__content_${this.props.name}`}>
                    <button type="button" className="popup__close-btn" onClick={this.props.onClose}></button>
                    <h3 className="popup__title">{this.props.title}</h3>
                    <form name={this.props.name} action="submit" className={`popup__form popup__form_${this.props.name}`} onSubmit={this.props.onSubmit}>
                        {this.props.children}
                        <button type="submit" className="popup__submit-btn">Сохранить</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default PopupWithForm;