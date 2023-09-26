import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title="Atualizar foto" name="picture">
      <label className="form__field">
        <input type='url' ref={avatarRef} className="form__input" placeholder="URL da imagem" />
        <span className="form__input-error"></span>
      </label>
    </PopupWithForm>
  )
}