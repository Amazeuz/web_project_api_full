import React from 'react';
import { useHistory } from 'react-router-dom';
import loggedVector from '../images/logged_vector.svg';
import notLoggedVector from '../images/not_logged_vector.svg';
import exitIconSrc from '../images/vector__add.svg';

export default function InfoTooltip({ isValidFields, setPopupState, method }) {
  const history = useHistory();

  function closeRegisterPopup() {
    setPopupState(false)

    if (isValidFields) {
      history.push('/signin');
    }
  }

  function defineMethod() {
    if (method === 'register') {
      if (isValidFields) {
        return 'Vitória ! Você conseguiu se registrar.'
      } else {
        return 'Ops ! Algo deu errado.'
      }
    }
    else if (method === 'login') {
      if (!isValidFields) {
        return 'Ops ! Algo deu errado.'
      }
    }
  }

  return (
    <div className='info-tool-tip-popup'>
      <img src={exitIconSrc} className="form__exit" onClick={closeRegisterPopup} alt="Botão de fechar o pop-up" />
      <img src={isValidFields ? loggedVector : notLoggedVector} className='info-tool-tip-popup__image' alt='Imagem com o status de login' />
      <p className='info-tool-tip-popup__text'>
        {defineMethod()}
      </p>
    </div>
  )
}