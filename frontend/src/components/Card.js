import React, { useContext } from "react";
import trashIconSrc from '../images/trash-icon.svg'
import likeIconSrc from '../images/vector__like-button.svg'
import likedIconSrc from '../images/vector__liked-button.svg'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = props.owner === currentUser._id;
  const isLiked = props.likes.some(userId => userId === currentUser._id);

  function handleLikeClick() {
    props.onCardLike(props)
  }

  function handleDeleteClick() {
    props.onCardDelete(props)
  }

  return (
    <div className="item">
      <img className="item__image" src={`${props.link}`} onClick={props.onCardClick} alt="Imagem adicionada pelo usuário" />
      <img src={trashIconSrc} className={`item__trash-icon ${isOwn ? '' : 'item__trash-icon_hidden'}`} onClick={handleDeleteClick} id="form-confirmation-trigger" alt="Ícone de lixo, para excluir a foto desejada" />
      <div className="item__container">
        <h1 className="item__title">{props.name}</h1>
        <div>
          <img src={isLiked ? likedIconSrc : likeIconSrc} onClick={handleLikeClick} className="item__like" alt="Um coração com a função de curtir a imagem" />
          <p className="item__likes">{props.likes.length}</p>
        </div>
      </div>
    </div>
  )
}