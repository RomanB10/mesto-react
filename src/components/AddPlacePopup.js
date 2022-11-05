import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm"; //подгрузили компонент формы

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  //переменные состояния новой карточки
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeLink(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    //запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    //Передаем значения name, link управляемых компонентов во внешний обработчик
    onAddPlace({
      name: name,
      link: link,
    });
  }

  //useEffect, реагирует на пропс isOpen, очищает значения инпутов при открытии попапа
  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      id="2"
      name="add-card"
      title="Новое место"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
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
          value={name}
          onChange={handleChangeName}
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
          value={link}
          onChange={handleChangeLink}
        />
        <span className="placeImage-error popup__input-error" />
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
