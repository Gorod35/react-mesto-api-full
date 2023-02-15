import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import * as auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function App() {

    const [cards, setCards] = React.useState([]);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    // const [isLoading, setIsLoading] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({
        isOpen: false
    });
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const [currentUser, setCurrentUser] = React.useState({});
    const [userData, setUserData] = React.useState({});

    const history = useHistory();
    // const token = localStorage.getItem('token');

    // React.useEffect(() => {
    //     Promise.all([api.getUserInfo(), api.getInitialCards()])
    //         .then(([userData, cards]) => {
    //             setCurrentUser(userData);
    //             setCards(cards);
    //         })
    //         .catch((err) => {
    //             console.log('Ошибка. Запрос не выполнен');
    //         })


    //     if (token) {
    //         auth.checkToken(token)
    //             .then((res) => {
    //                 setUserData(res.data);
    //                 setLoggedIn(true);
    //                 history.push('/');
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //     }
    // }, []);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    setUserData(res);
                    setLoggedIn(true);
                    history.push('/');
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [history])

    React.useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                    .then(([userData, cards]) => {
                        setCurrentUser(userData);
                        setCards(cards);
                    })
                    .catch((err) => {
                        console.log('Ошибка. Запрос не выполнен');
                    })
        }
    }, [ loggedIn ])

    const handleCardLike = (card) => {

        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then((res) => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard({
            isOpen: true,
            ...card
        })
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({ isOpen: false });
        setIsInfoTooltipOpen(false);
    };

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.isOpen || isInfoTooltipOpen;

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    const handleUpdateUser = (data) => {
        api.setUserInfo(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })

    }

    const handleUpdateAvatar = (link) => {
        api.setAvatar(link)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })
    }

    const handleAddPlace = (data) => {
        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })
    }

    const handleRegister = ({ password, email }) => {
        auth.register({ password, email })
            .then(res => {
                setIsInfoTooltipOpen(true);
                setIsSuccess(true);
                history.push('/sign-in');
                return res;
            })
            .catch(err => {
                setIsInfoTooltipOpen(true);
                setIsSuccess(false);
                return err;
            })
    }

    const handleLogin = ({ password, email }) => {
        auth.authorize({ password, email })
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    setUserData({ email: email })
                    setLoggedIn(true);
                    history.push('/');
                } else {
                    setIsInfoTooltipOpen(true);
                    setIsSuccess(false);
                }
            })
            .catch((err) => {
                setIsInfoTooltipOpen(true);
                setIsSuccess(false);
                console.log('Ошибка. Запрос не выполнен');
            })
    }

    const handleExit = () => {
        localStorage.removeItem('token');
        setUserData({ email: '' });
        setLoggedIn(false);
    }





    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header isLoggedIn={loggedIn} userData={userData} onSignOut={handleExit} />
                <Switch>
                    <ProtectedRoute exact
                        path="/"
                        loggedIn={loggedIn}
                        component={() => (
                            <>
                                <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
                                <Footer />
                                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
                                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                                <PopupWithForm title="Вы уверены?" name="confirm" />
                                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                            </>
                        )}
                    />
                    <Route path='/sign-in' exact>
                        <Login onLogin={handleLogin} />
                    </Route>

                    <Route path='/sign-up' exact>
                        <Register onRegister={handleRegister} />
                    </Route>

                    <Route path="*">
                        {loggedIn
                            ? <Redirect to="/mesto" />
                            : <Redirect to="/sign-in" />}
                    </Route>
                </Switch>
                <InfoTooltip isOpen={isInfoTooltipOpen} isSuccess={isSuccess} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
