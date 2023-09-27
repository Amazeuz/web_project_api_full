import React, { useContext } from 'react';
import openEditPopupSrc from '../images/vector__edit.svg'
import openAddPopupSrc from '../images/vector__add.svg'
import photoEditIcon from '../images/profile-photo-edit.svg'
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container">
          <img className="profile__photo" onClick={props.onEditAvatarClick} src={currentUser.avatar} id="form-picture-trigger" alt="Foto de perfil do usuário" />
          <img src={photoEditIcon} className="profile__edit-button" alt="Ícone de Edição da imagem de perfil" />
        </div>
        <div className="profile-info">
          <div>
            <h1 className="profile__name">{currentUser.name}</h1>
            <img src={openEditPopupSrc} className="profile__edit" onClick={props.onEditProfileClick} id="form-edit-trigger" alt="Botão de edição dos campos Nome e Sobre" />
          </div>
          <h2 className="profile__about">{currentUser.about}</h2>
        </div>
        <img src={openAddPopupSrc} className="profile__add" onClick={props.onAddPlaceClick} id="form-image-trigger" alt="Botão de adicionar imagens á galeria" />
      </section>
      <section className="gallery">
        {props.cardList.map((card, i) => (
          <Card
            key={i}
            name={card.name}
            link={card.link}
            likes={card.likes}
            _id={card._id}
            owner={card.owner}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            onCardClick={props.onCardClick}
          />
        ))
        }
      </section>
    </main>
  );
}

export default Main;