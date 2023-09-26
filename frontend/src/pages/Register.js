import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import InfoTooltip from '../components/InfoTooltip';
import { register } from '../utils/auth';

export default function Register() {
  const [isValidRegister, setValidRegister] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupClick] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    register(email, password)
      .then(res => {
        if (res) {
          setValidRegister(true);
        }
      })
      .then(() => {
        setRegisterPopupClick(true)
      })
  }

  function handleChange(evt) {
    const { name, value } = evt.target;

    if (name === 'email') {
      setEmail(value)
    }
    else if (name === 'password') {
      setPassword(value)
    }
  }

  return (
    <>
      <form className='auth-form'>
        <h1 className='auth-form__title'>Inscrever-se</h1>
        <div className='auth-form__input-container'>
          <input id='email' name='email' placeholder='E-mail' className='auth-form__input' onChange={handleChange} />
          <input id='password' name='password' placeholder='Senha' className='auth-form__input' onChange={handleChange} />
        </div>
        <button type='submit' onClick={handleSubmit} className='auth-form__button'>Inscrever-se</button>
        <Link to='signin' className='auth-form__link'>
          Já é um membro ? Faça login aqui!
        </Link>
      </form>
      {isRegisterPopupOpen && <InfoTooltip isValidFields={isValidRegister} setPopupState={setRegisterPopupClick} method={'register'} />}
    </>
  )
}