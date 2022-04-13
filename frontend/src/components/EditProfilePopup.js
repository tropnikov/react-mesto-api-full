import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  closeByOverlayClick,
}) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  const [name, setName] = React.useState('Жак Ив Кусто');
  const [description, setDescription] = React.useState('Исследователь океана');

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      closeByOverlayClick={closeByOverlayClick}
      onClose={onClose}
      isOpen={isOpen}
      name="profile-edit"
      title="Редактировать профиль"
      submitButtonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={handleNameChange}
        id="profile-name-input"
        type="text"
        name="name"
        className="form__input"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="profile-name-input-error form__input-error"></span>
      <input
        value={description}
        onChange={handleDescriptionChange}
        id="profile-bio-input"
        type="text"
        name="about"
        className="form__input"
        placeholder="Краткое био"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="profile-bio-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
