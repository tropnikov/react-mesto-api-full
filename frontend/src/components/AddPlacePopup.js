import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onClose, isOpen, onAddPlace, closeByOverlayClick }) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  React.useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [isOpen]);

  const handlePlaceNameChange = (evt) => {
    setPlaceName(evt.target.value);
  };
  const handlePlaceLinkChange = (evt) => {
    setPlaceLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({ name: placeName, link: placeLink });
  };

  return (
    <PopupWithForm
      closeByOverlayClick={closeByOverlayClick}
      onClose={onClose}
      isOpen={isOpen}
      name="place-add"
      title="Новое место"
      submitButtonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        id="place-name-input"
        type="text"
        name="name"
        className="form__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={placeName}
        onChange={handlePlaceNameChange}
      />
      <span className="place-name-input-error form__input-error"></span>
      <input
        id="place-link-input"
        type="url"
        name="link"
        className="form__input"
        placeholder="Ссылка на картинку"
        required
        value={placeLink}
        onChange={handlePlaceLinkChange}
      />
      <span className="place-link-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
