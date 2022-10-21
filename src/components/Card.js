function Card({card, onImageZoom}) {

  function handleClick() {
    onImageZoom(card);
  }  

  return (
    <li className="rectangle">
      <button
        className="rectangle__button-trash"
        type="button"
        aria-label="Корзина"
      ></button>
      <img
        className="rectangle__image"
        alt={`Здесь должно быть изображение ${card.name}`}
        src={card.link}
        /*style={{ backgroundImage: `url(${link})`}} //альтернативный способ*/
        onClick ={handleClick}
      />
      <div className="rectangle__title">
        <h2 className="rectangle__text">{card.name}</h2>
        <div className="rectangle__group-like">
          <button
            className="rectangle__button"
            type="button"
            aria-label="Лайк"
          ></button>
          <p className="rectangle__count-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
