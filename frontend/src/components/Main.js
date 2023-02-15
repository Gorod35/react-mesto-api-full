/* eslint-disable no-unused-vars */
import React from 'react';
import Card from './Card';
import { currentUser, CurrentUserContext } from '../contexts/CurrentUserContext';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userDescription: '',
            userAvatar: ''
        }
    }

    static contextType = CurrentUserContext;

    render() {
        return (
            <main className="content">
                <section className="profile">
                    <div className="profile__info">
                        <div className="profile__avatar" onClick={this.props.onEditAvatar}>
                            <img src={this.context.avatar} alt={this.context.name} className="profile__image" />
                        </div>
                        <div className="profile__description">
                            <div className="profile__name-edit">
                                <h1 className="profile__title">{this.context.name}</h1>
                                <button type="button" className="profile__edit-btn" onClick={this.props.onEditProfile}></button>
                            </div>

                            <p className="profile__subtitle">{this.context.about}</p>
                        </div>
                    </div>
                    <button type="button" className="profile__add-btn" onClick={this.props.onAddPlace}></button>
                </section>

                <section className="card">
                    <ul className="card__items">
                        {
                            this.props.cards.map((card) => {
                                return (
                                    <Card key={card._id} card={card} onCardClick={this.props.onCardClick} onCardLike={this.props.onCardLike} onCardDelete={this.props.onCardDelete} />
                                );
                            })
                        }
                    </ul>
                </section>
            </main>
        );
    }
}

export default Main;