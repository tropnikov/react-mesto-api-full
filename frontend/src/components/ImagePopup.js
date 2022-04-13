function ImagePopup(props) {
  return (
    <div
      onClick={props.closeByOverlayClick}
      className={
        props.card
          ? `popup popup_photo place-full-photo popup_opened`
          : `popup popup_photo place-full-photo`
      }
    >
      <div className="popup__photo-container">
        <button
          className="popup__close button button_type_close hover"
          type="button"
          aria-label="Закрыть попап"
          onClick={props.onClose}
        ></button>

        <img
          src={props.card ? props.card.link : `#`}
          alt={props.card ? props.card.name : `Фотография места`}
          className="place-full-photo__image"
        />
        <h3 className="place-full-photo__caption">
          {props.card ? props.card.name : ``}
        </h3>
      </div>
    </div>
  );
}

export default ImagePopup;
