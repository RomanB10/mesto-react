function ImagePopup({ card, onClose }) {
  return (
    <div
      className={
        !card
          ? "popup popup_type_open-image "
          : "popup popup_type_open-image popup_opened"
      }
    >
      <div className="popup__container-image">
        <figeure className="popup__main-illustration">
          <button
            className="popup__close-btn"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          ></button>
          {console.log(card)}
          <img
            className="popup__image-place"
            src={card.link}
            alt="Здесь должно быть изображение"
          />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figeure>
      </div>
    </div>
  );
}

export default ImagePopup;
