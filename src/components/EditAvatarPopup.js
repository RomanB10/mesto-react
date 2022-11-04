import { useRef } from "react";
import PopupWithForm from "./PopupWithForm"; //подгрузили компонент формы

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(); //записываем объект, возвращаемый хуком в переменную

  function handleSubmit(event) {
    //запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    //Передаем значение avatar во внешний обработчик APP
    onUpdateAvatar(
      { avatar: avatarRef.current.value } //значение инпута полученное с помощью рефа
    );
  }

  return (
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
            ref={avatarRef}
          />
          <span className="avatar-error popup__input-error" />
        </div>
      }
      btnText="Сохранить"
      isOpen={isOpen} //в скобках передаваемый пропс из APP, далее прокидываем его в компонент PopupWithForm
      onClose={onClose} //в скобках передаваемый пропс из APP, далее прокидываем его в компонент PopupWithForm
      onSubmit={handleSubmit}
    />
  );
}

export default EditAvatarPopup;
