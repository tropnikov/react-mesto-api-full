function PopupWithForm(props) {
  return (
    <div
      onClick={props.closeByOverlayClick}
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_opened`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__container">
        <button
          className="
            popup__close
            button button_type_close
            hover
          "
          onClick={props.onClose}
          type="button"
          aria-label="Закрыть попап"
        ></button>
        <h2 className="popup__title">{props.title}</h2>

        <form
          onSubmit={props.onSubmit}
          action="#"
          className={`form popup__form form_type_${props.name}`}
          name={`${props.name}-form`}
        >
          {props.children}
          <button
            type="submit"
            className="
          popup__save
          button
          form__submit
          button_type_save
          "
          >
            {props.submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
