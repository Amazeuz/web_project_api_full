import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name)
  const [about, setAbout] = useState(currentUser.about)

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleAboutChange(evt) {
    setAbout(evt.target.value)
  }

  function handleSubmit(evt) {
     evt.preventDefault();

    if (name.replace(/ /g,'').length > 0 && about.replace(/ /g,'').length > 0) {
      props.onUpdateUser({
        name,
        about
      });
    }
    else {
      alert('Digite valores válidos!')
    }
  }

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title="Editar Perfil" name="edit">
      <label className="form__field">
        <input type='text' className="form__input" onChange={handleNameChange} placeholder="Nome" />
        <span className="form__input-error"></span>
      </label>
      <label className="form__field">
        <input type='text' className="form__input" onChange={handleAboutChange} placeholder="Sobre mim" />
        <span className="form__input-error"></span>
      </label>
    </PopupWithForm>
  )
}