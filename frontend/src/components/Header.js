import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {

  const path = useLocation().pathname;

  const [isActive, setIsActive] = useState(false);
  const handleButton = () => {
    setIsActive(!isActive);
  }

  const hadleSignOut = () => {
    props.onSignOut();
    handleButton();
  }

  return (
    <header className={`header ${isActive ? 'active' : ''}`}>
      <img src={logo} alt="Логотип" className="header__logo" />
      {(props.isLoggedIn)
        ? <><button type="button" className={`header__burger button ${isActive ? "active" : ""}`} onClick={handleButton}>
          <span></span>
        </button>
          <nav
            className={`header__menu header__menu_active ${isActive ? 'active' : ''}`}>
            <ul className="header__list">
              <li>
                <p className="header__email">{props.userData.email}</p>
              </li>
              <li>
                <button className="header__button" onClick={hadleSignOut}>Выйти</button>
              </li>
            </ul>
          </nav></>
        : <Link className='header__link' to={path === "/sign-in" ? "/sign-up" : "/sign-in"}>{path === "/sign-in" ? 'Регистрация' : 'Войти'}</Link>
      }
    </header >
  );
}

export default Header; 