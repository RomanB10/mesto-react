import { useState, useEffect } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";

import ImagePopup from "./ImagePopup";
import api from "../utils/Api";

import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  //переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Стейт, отвечающий за данные ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ
  const [currentUser, setCurrentUser] = useState({});

  //Стейт, отвечающий за отобрпжение КАРТОЧЕК
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

  //Отправка на сервер данных (name, description).Объект значений передается из EditProfilePopup
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((dataFromServer) => {
        setCurrentUser(dataFromServer); //обновление стейта
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Отправка на сервер данных (avatar).Объект значений передается из EditAvatarPopup
  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((dataFromServer) => {
        setCurrentUser(dataFromServer); //обновление стейта
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Отправка на сервер Новой карточки.Объект значений передается из AddPlacePopup
  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((dataFromServer) => {
        const newCard = dataFromServer;
        setCards([newCard, ...cards]); //при сеттере необходимо создавать новый массив, клонируя предыдущий ...spread
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Функция установки лайков
  function handleCardLike(card) {
    //Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //Отправляем запрос в API и получаем обновленные данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((cardFromServer) => {
        setCards((state) =>//вместо значения в setCards передаем функцию, первый параметр (state)которой-текущий стейт
          state.map((item) => (item._id === card._id ? cardFromServer : item))
        ); //обновляем стейт карточек */
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Функция удаления карточки
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const updatedCards = cards.filter(function (item) {
          return item._id !== card._id;
        }); //возвращает новый массив без карточки, в которой кликнули по корзине
        setCards(updatedCards); //обновляем стейт карточек локально
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос к серверу за данными (загрузка текущего ПОЛЬЗОВАТЕЛЯ)
  useEffect(() => {
    api
      .getUserInfo()
      .then((dataFromServer) => {
        setCurrentUser(dataFromServer); //обновленние стейт переменной данными с СЕРВЕРА
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Запрос к серверу за данными (загрузка КАРТОЧЕК)
  useEffect(() => {
    api
      .getAllCards()
      .then((dataFromServer) => {
        setCards(dataFromServer); //обновленние стейт переменной данными с СЕРВЕРА
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="root">
      <div className="page root__section">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm
            id="3"
            name="confirmation"
            title="Вы уверены?"
            btnText="Да"
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
