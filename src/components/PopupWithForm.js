function PopupWithForm(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_opened`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__container">
        <form
          className="popup__form popup__form_type_edit-profile"
          action="./scripts/script.js"
          method="post"
          name={`${props.name}`}
          novalidate
          tabindex="0"
        >
          <button
            className="popup__close-btn"
            type="button"
            aria-label="Закрыть"
            tabindex="4"
            onClick={props.onClose}
          ></button>
          <h3 className="popup__title-profile">{props.title}</h3>
          <fieldset className="popup__form-items">{props.children}</fieldset>
          <button
            type="submit"
            name="submit"
            className="popup__submit-btn"
            tabindex="3"
          >
            {props.btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
