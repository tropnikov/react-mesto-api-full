import Ok from '../images/reg-success.svg';
import Err from '../images/reg-error.svg';

const InfoTooltip = (props) => {
  return (
    <div
      onClick={props.closeByOverlayClick}
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_opened`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__container popup__container_type_tooltip">
        <button
          className="
          popup__close
          button button_type_close
          hover
        "
          onClick={props.onClose}
          type="button"
          aria-label="Закрыть попап"
        />
        <img
          className="popup__registration-image-status"
          src={props.status ? Ok : Err}
          alt="Картинка статуса"
        />
        <h2 className="popup__title popup__title_type_tooltip">
          {props.title}
        </h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
