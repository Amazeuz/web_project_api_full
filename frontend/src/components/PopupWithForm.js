import React from 'react';
import exitIconSrc from '../images/vector__add.svg'

export default function PopupWithForm(props) {

  return (
    <section className={`form popup ${props.isOpen ? 'popup_is-opened' : ''}`} name={props.name} id={`form-${props.name}`}>
      <img src={exitIconSrc} className="form__exit" onClick={props.onClose} alt="Botão de fechar o pop-up" />
      <form name="info" className="form__items" onSubmit={props.onSubmit} noValidate>
        <h1 className="form__title">{props.title}</h1>
        <fieldset className="form__input-container">
          { props.children }
          <button type="submit" className="form__button">Salvar</button>
        </fieldset>
      </form>
    </section>
  );
}