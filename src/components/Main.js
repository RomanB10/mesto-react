import Card from "./Card";

function Main({
  userAvatar,
  userName,
  userDescription,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
}) {
  return (
    <main className="main">
      <section className="profile root__section">
        <div className="profile__container">
          <img
            className="profile__image"
            /*style={{ backgroundImage: `url(${props.userAvatar})` }} //Чтобы подставить URL аватара в контейнер */
            src={userAvatar}
            alt="Здесь должно быть изображение Аватара"
          />
          <button
            className="profile__avatar-btn"
            type="submit"
            name="submit"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__wrapper">
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="profile__edit-btn"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
          <button
            className="profile__add-btn"
            type="button"
            onClick={onAddPlace}
          ></button>
        </div>
      </section>
      <section className="content root__section">
        <ul className="photo-grid">
          {cards.map((item) => (
            <Card key={item.id} card={item} onImageZoom={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
