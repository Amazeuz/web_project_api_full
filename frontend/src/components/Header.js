import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import lineIconSrc from '../images/logo/Line.svg'
import vectorIconSrc from '../images/logo/Vector.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Header({ loggedIn, handleLogout }) {
  const currentURL = window.location.pathname;
  const currentUser = useContext(CurrentUserContext)
  const history = useHistory();

  function setHeaderLinks() {
    if (currentURL === '/signup') {
      return <a href='/signin' className='header__link'>Faça o login</a>
    }
    else if (currentURL === '/signin') {
      return <a href='/signup' className='header__link'>Inscreva-se</a>
    }
    else if (currentURL === '/') {
      return (
        <div className='header__text-container'>
          <p className='header__text'>{loggedIn && currentUser.email}</p>
          <button className='header__button' onClick={logoutSession}>Sair</button>
        </div>
      )
    }
  }

  function logoutSession() {
    localStorage.removeItem('jwt');
    handleLogout();
    history.push('/signin');
  }

  return (
    <header className="header">
      <div className='header__container'>
        <img src={vectorIconSrc} id="vector-icon" className="header__title" alt="Logotipo Around The U.S." />
        <div>
          {setHeaderLinks()}
        </div>
      </div>
      <img src={lineIconSrc} id="line-icon" alt="Linha escura horizontal percorrendo o cabeçalho" />
    </header>
  );
};

export default Header;