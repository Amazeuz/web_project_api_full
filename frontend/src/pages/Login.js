import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { authorize } from '../utils/auth';
import InfoTooltip from '../components/InfoTooltip';

export default function Login({ handleLogin, isValidToken }) {
  const [isLoginPopupOpen, setLoginPopupClick] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const history = useHistory();

  useEffect(() => {
    if (isValidToken()) {
      handleLogin();
      history.push('/');
    }
    else {
      console.error('Token inválido')
    }
  }, [])

  function handleChange(evt) {
    const { name, value } = evt.target;

    if (name === 'email') {
      setEmail(value)
    }
    else {
      setPassword(value)
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    authorize(email, password)
      .then((res) => {
        if (res !== undefined) {
          localStorage.setItem('jwt', res.token);
          setTimeout(() => { handleLogin() }, 1000)
          window.location.reload();
        }
        else {
          setLoginPopupClick(true);
        }
      })
  }

  return (
    <>
      <form className='auth-form'>
        <h1 className='auth-form__title'>Entrar</h1>
        <div className='auth-form__input-container'>
          <input name='email' placeholder='E-mail' className='auth-form__input' onChange={handleChange} />
          <input name='password' placeholder='Senha' className='auth-form__input' onChange={handleChange} />
        </div>
        <button type='submit' className='auth-form__button' onClick={handleSubmit}>Entrar</button>
        <Link to='signup' className='auth-form__link'>
          Ainda não é membro ? Inscreva-se aqui!
        </Link>
      </form>
      {isLoginPopupOpen && <InfoTooltip isValidFields={false} setPopupState={setLoginPopupClick} method='login' />}
    </>
  )
}