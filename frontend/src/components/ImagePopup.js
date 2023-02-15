import React from 'react';

class ImagePopup extends React.Component {

    constructor(props) {
        super(props);
    }

    handleOverlayClose = (e) => {
        if (e.target === e.currentTarget && this.props.card.isOpen) {
            this.props.onClose();
        }
    };

    render() {
        return (
            <div className={`popup popup_zoom-photo' ${this.props.card.isOpen ? 'popup__opened' : ''}`} onClick={this.handleOverlayClose}>
                <div className="popup__content popup__content_zoom">
                    <button type="button" className="popup__close-btn" onClick={this.props.onClose}></button>
                    <figure className="popup__img-container">
                        <img src={this.props.card.link} alt={this.props.card.name} className="popup__img" />
                        <figcaption className="popup__imgcaption">{this.props.card.name}</figcaption>
                    </figure>
                </div>
            </div>
        )
    }
}

export default ImagePopup;