import { useState, useEffect } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";

function App() {
  //переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  //переменная состояния, отвечающая за отображение данных пользователя
  const [user, setUser] = useState({});
  //переменная состояния, отвечающая за отображение карточек
  const [cards, setCards] = useState([]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  //запрос к серверу за данными пользователя
  useEffect(() => {
    api
      .getInfoUser()
      .then((data) => {
        const owner = {
          userDescription: data.about,
          src: data.avatar,
          userName: data.name,
          id: data._id,
        };
        setUser(owner);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //запрос к серверу за данными карточек
  useEffect(() => {
    api
      .getAllCards()
      .then((data) => {
        const results = data.map((item) => ({
          likes: item.likes,
          link: item.link,
          name: item.name,
          owner: item.owner,
          id: item._id,
        }));
        setCards(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
 
      <div className="page root__section">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          userName={user.userName}
          userDescription={user.userDescription}
          userAvatar={user.src}
          cards={cards}
        />
        <Footer />
        <PopupWithForm
          id="1"
          name="edit-profile"
          title="Редактировать профиль"
          children={
            <>
              <div className="popup__form-item">
                <input
                  className="popup__input popup__input_type_name"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Имя"
                  required
                  minLength="2"
                  maxLength="40"
                  title=" Длина поля должна быть 2 и более символов и менее или равно 40"
                  tabIndex="1"
                />
                <span className="name-error popup__input-error" />
              </div>
              <div className="popup__form-item">
                <input
                  className="popup__input popup__input_type_job"
                  type="text"
                  name="job"
                  id="job"
                  placeholder="О себе"
                  required
                  minLength="2"
                  maxLength="200"
                  title=" Длина поля должна быть 2 и более символов и менее или равно 200"
                  tabIndex="2"
                />
                <span className="job-error popup__input-error" />
              </div>
            </>
          }
          btnText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          id="2"
          name="add-card"
          title="Новое место"
          children={
            <>
              <div className="popup__form-item">
                <input
                  className="popup__input popup__input_type_place-name"
                  type="text"
                  name="place-name"
                  id="placeName"
                  placeholder="Название"
                  required
                  minLength="2"
                  maxLength="30"
                  title=" Длина поля должна быть 2 и более символов и менее или равно 30"
                  tabIndex="1"
                />
                <span className="placeName-error popup__input-error" />
              </div>
              <div className="popup__form-item">
                <input
                  className="popup__input popup__input_type_place-image"
                  type="url"
                  name="place-image"
                  id="placeImage"
                  placeholder="Ссылка на картинку"
                  required
                  title="Введите URL"
                  tabIndex="2"
                />
                <span className="placeImage-error popup__input-error" />
              </div>
            </>
          }
          btnText="Сохранить"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          id="3"
          name="confirmation"
          title="Вы уверены?"
          btnText="Да"
        />
        <PopupWithForm
          id="4"
          name="change-avatar"
          title="Обновить аватар"
          children={
            <div className="popup__form-item">
              <input
                className="popup__input popup__input_type_change-avatar"
                type="url"
                name="avatar"
                id="avatar"
                placeholder="Ссылка на картинку"
                required
                title="Введите URL"
                tabIndex="1"
              />
              <span className="avatar-error popup__input-error" />
            </div>
          }
          btnText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
 
  );
}

export default App;
