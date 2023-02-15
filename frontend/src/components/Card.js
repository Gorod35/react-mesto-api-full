import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class Card extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    static contextType = CurrentUserContext;

    handleLikeClick = () => {
        this.props.onCardLike(this.props.card);
        console.log(this.props.card);
    }

    handleDeleteClick = () => {
        this.props.onCardDelete(this.props.card);
    }

    isOwn = () => {
        return (this.props.card.owner === this.context._id)
    }

    isLiked = () => {
        return (this.props.card.likes.some(i => i === this.context._id));
    }

    cardLikeButtonClassName = () => {
        return (`card__like-btn ${this.isLiked() ? 'card__like-btn_active' : ''}`)
    }

    cardDeleteButtonClassName = () => {
        return (`card__delete-btn ${this.isOwn() ? '' : 'card__delete-btn_invisible'}`)
    }

    handleClick = () => {
        this.props.onCardClick(this.props.card);
    }

    render() {
        return (
            <li className="card__item">
                <img src={this.props.card.link} alt={this.props.card.name} className="card__image" onClick={this.handleClick} />
                <button className={`${this.cardDeleteButtonClassName()}`} onClick={this.handleDeleteClick}></button>
                <div className="card__description">
                    <h2 className="card__title">{this.props.card.name}</h2>
                    <div className="card__container">
                        <button type="button" className={this.cardLikeButtonClassName()} onClick={this.handleLikeClick}></button>
                        <span className="card__counter">{this.props.card.likes.length}</span>
                    </div>
                </div>
            </li>
        );
    }
}

export default Card;