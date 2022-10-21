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
  const [user, setUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(false);

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
    setSelectedCard(false);
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
    <div className="App">
      <body class="root">
        <div class="page root__section">
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
            children=""
            btnText="Сохранить"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />
          <PopupWithForm
            id="2"
            name="add-card"
            title="Новое место"
            children=""
            btnText="Сохранить"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          />
          <PopupWithForm
            id="3"
            name="confirmation"
            title="Вы уверены?"
            children=""
            btnText="Да"
          />
          <PopupWithForm
            id="4"
            name="change-avatar"
            title="Обновить аватар"
            children=""
            btnText="Сохранить"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </body>
    </div>
  );
}

export default App;
