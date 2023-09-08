import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const cardTitleRef = useRef();
  const cardLinkRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateCards(cardTitleRef.current.value, cardLinkRef.current.value)
  }

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title="Novo Local" name="image">
      <label className="form__field">
        <input type='text' className="form__input" ref={cardTitleRef} placeholder="Título" />
        <span className="form__input-error"></span>
      </label>
      <label className="form__field">
        <input type='url' className="form__input" ref={cardLinkRef} placeholder="URL da imagem: https://" />
        <span className="form__input-error"></span>
      </label>
    </PopupWithForm>
  )
}