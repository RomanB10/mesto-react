import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onImageZoom, onCardLike, onCardDelete }) {
  //Подписываемся на контекст
  const currentUser = useContext(CurrentUserContext);

  //Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  //Создаем переменную, которую после задаем в `className` для КНОПКИ УДАЛЕНИЯ
  const cardDeleteButtonClassName = `rectangle__button-trash ${
    isOwn && `rectangle__button-trash_active`
  }`;

  //Определяем, есть ли у карточки лайк, поставленный тукущим пользователем
  const isLiked = card.likes.some(function (item) {
    return item._id === currentUser._id;
  }); //можно оптимизировать (i => i._id === currentUser._id)
  //Создаем переменную, которую после задаем в `className` для КНОПКИ ЛАЙКА
  const cardLikeButtonClassName = `rectangle__button ${
    isLiked && `rectangle__button_active`
  }`;

  function handleClick() {
    onImageZoom(card); //спустли функцию из APP через компонент Main
  }

  function handleLikeClick() {
    onCardLike(card); //спустли функцию из APP через компонент Main
  }

  function handleDeleteClick() {
    onCardDelete(card); //спустли функцию из APP через компонент Main
  }

  return (
    <li className="rectangle">
      <button
        /*className="rectangle__button-trash"*/
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Корзина"
        onClick={handleDeleteClick}
      />
      <img
        className="rectangle__image"
        alt={`Здесь должно быть изображение ${card.name}`}
        src={card.link}
        /*style={{ backgroundImage: `url(${link})`}} //альтернативный способ*/
        onClick={handleClick}
      />
      <div className="rectangle__title">
        <h2 className="rectangle__text">{card.name}</h2>
        <div className="rectangle__group-like">
          <button
            /*className="rectangle__button"*/
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          />
          <p className="rectangle__count-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
